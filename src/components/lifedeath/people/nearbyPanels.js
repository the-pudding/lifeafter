import * as THREE from "three";
import { makeLabelPanel } from "../utilities/textPanel.js";
import { formatNearbyPersonLines } from "./personSummary.js";
import {
	FACE_CAMERA_RADIUS,
	FIGURE_HEIGHT,
	NEARBY_INCUMBENT_STICKINESS,
	NEARBY_PANEL_MAX_APPARENT_SCALE,
	NEARBY_PANEL_MIN_APPARENT_SCALE,
	NEARBY_PANEL_REFERENCE_DISTANCE,
	NEARBY_PANEL_WORLD_WIDTH,
	NEARBY_PEOPLE_MAX,
	NEARBY_PERSON_FOV_HALF_ANGLE,
	NEARBY_PERSON_FOV_SCREEN_MARGIN,
	NEARBY_PERSON_HEAD_GAP,
	NEARBY_PERSON_MAX_DISTANCE,
	NEARBY_PANEL_FADE_SECONDS,
	NEARBY_PANEL_LINE_LENGTH,
	NEARBY_PANEL_LINE_SECONDS,
	NEARBY_PANEL_LINE_WIDTH,
	NEARBY_SELECTION_REFRESH_INTERVAL
} from "./peopleConfig.js";

/**
 * floating info panels above nearby crowd members: who gets one, building
 * the label texture, and positioning/scaling/billboarding each frame.
 *
 * getters because it reads live walker/camera state. owns three.js
 * resources that need disposing when a person loses their slot.
 */
export function createNearbyPanels({
	respondents,
	personRoots,
	camera,
	renderer,
	innerRoomGroup,
	occluderMeshes,
	walkerScaleCorrection,
	getRenderWalkX,
	getRenderWalkZ,
	getCameraYaw,
	getInsideRoom,
	getMode,
	getPositionMode,
	getSelectedVariable,
	getHasStoryText
}) {
	// once, not per panel. keeps minified label text crisp
	const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();

	const nearbyVisibilityRaycaster = new THREE.Raycaster();
	const nearbyVisibilityDirection = new THREE.Vector3();
	// -> sq. distance if near, in-cone and unblocked. else null
	function qualifiesForNearbyPanel(index, blockerMeshes, cosHalfAngle) {
		const root = personRoots[index];
		if (!root.visible) return null;
		const dx = root.position.x - getRenderWalkX();
		const dz = root.position.z - getRenderWalkZ();
		const distSq = dx * dx + dz * dz;
		if (distSq >= NEARBY_PERSON_MAX_DISTANCE * NEARBY_PERSON_MAX_DISTANCE)
			return null;
		// unit vector, so the dot is cos(angle) * dist — avoids a sqrt
		const forwardX = Math.sin(getCameraYaw());
		const forwardZ = -Math.cos(getCameraYaw());
		const dot = dx * forwardX + dz * forwardZ;
		if (dot <= 0 || dot * dot < cosHalfAngle * cosHalfAngle * distSq) {
			return null;
		}
		// line of sight vs. structure only. counting people starved the
		// selection; panels sit above heads and the z-buffer sorts the rest
		const headTop = computeHeadTopPoint(index);
		nearbyVisibilityDirection.subVectors(headTop, camera.position);
		const distanceToHead = nearbyVisibilityDirection.length();
		nearbyVisibilityDirection.normalize();
		nearbyVisibilityRaycaster.set(camera.position, nearbyVisibilityDirection);
		// stop short, or their own body blocks them
		nearbyVisibilityRaycaster.far = distanceToHead - 0.05;
		if (
			nearbyVisibilityRaycaster.intersectObjects(blockerMeshes, true).length > 0
		) {
			return null;
		}
		return distSq;
	}

	// head height from the real bbox, so it tracks each body model.
	// cached and de-scaled, so breathing doesn't bob the panel
	const nearbyHeadBox = new THREE.Box3();
	const nearbyHeadTopPoint = new THREE.Vector3();
	const nearbyStableHeadHeights = new Map();
	function stableHeadHeight(index) {
		const cached = nearbyStableHeadHeights.get(index);
		if (cached !== undefined) return cached;
		const root = personRoots[index];
		// setFromObject reads child matrixWorlds
		root.updateMatrixWorld(true);
		nearbyHeadBox.setFromObject(root);
		// feet at y=0, so max.y is height
		const breathFreeHeight =
			root.scale.y > 0 ? nearbyHeadBox.max.y / root.scale.y : 0;
		const baseHeightScale =
			respondents[index].__heightScale * walkerScaleCorrection;
		const height = breathFreeHeight * baseHeightScale;
		nearbyStableHeadHeights.set(index, height);
		return height;
	}
	// head top, no gap yet. X/Z live, Y fixed
	function computeHeadTopPoint(index) {
		const root = personRoots[index];
		nearbyHeadTopPoint.set(
			root.position.x,
			stableHeadHeight(index),
			root.position.z
		);
		return nearbyHeadTopPoint;
	}

	// leader line, drawn before the panel appears. unit quad standing on its
	// own origin, so scale.y is the drawn length. shared across panels —
	// they differ only by transform
	const nearbyLineGeometry = new THREE.PlaneGeometry(1, 1).translate(0, 0.5, 0);
	const nearbyLineMaterial = new THREE.MeshBasicMaterial({
		color: 0xffffff,
		// opaque, and a full z-buffer citizen: anything nearer hides it
		transparent: false,
		depthTest: true,
		depthWrite: true,
		side: THREE.DoubleSide
	});
	nearbyLineMaterial.userData.outlineParameters = { visible: false };

	// personIndex -> { mesh, texture, wave, variable }. keyed by respondent
	// so a panel survives rank changes. wave+variable are the text cache key
	const nearbyPanels = new Map();
	function disposeNearbyPanel(record) {
		// geometry/material are shared, so the line is only unparented
		record.line.parent?.remove(record.line);
		record.mesh.parent?.remove(record.mesh);
		record.mesh.geometry.dispose();
		const materials = Array.isArray(record.mesh.material)
			? record.mesh.material
			: [record.mesh.material];
		for (const material of materials) {
			material.map?.dispose();
			material.dispose();
		}
	}
	function buildNearbyPanel(index) {
		const lines = formatNearbyPersonLines(
			respondents[index],
			getPositionMode(),
			getSelectedVariable()
		);
		const { mesh, texture } = makeLabelPanel(lines, {
			width: NEARBY_PANEL_WORLD_WIDTH,
			anisotropy: maxAnisotropy
		});
		innerRoomGroup.add(mesh);
		const line = new THREE.Mesh(nearbyLineGeometry, nearbyLineMaterial);
		line.renderOrder = 9;
		line.visible = false;
		innerRoomGroup.add(line);
		// only the face materials carry the canvas; edges are invisible
		const fadeMaterials = (
			Array.isArray(mesh.material) ? mesh.material : [mesh.material]
		).filter((material) => material.map);
		for (const material of fadeMaterials) material.opacity = 0;
		// cache key. either changing rebuilds the texture
		return {
			mesh,
			texture,
			line,
			fadeMaterials,
			opacity: 0,
			lineProgress: 0,
			fadingOut: false,
			wave: getPositionMode(),
			variable: getSelectedVariable()
		};
	}
	// mark for fade-out. the update loop disposes it when invisible
	function dropNearbyPanel(index) {
		const record = nearbyPanels.get(index);
		if (record) record.fadingOut = true;
	}
	// two stages: the line draws up, then the panel fades in. reversed on
	// the way out. keeps following, disposes once both are gone
	function advancePanelFade(index, record, dt) {
		const lineStep = dt / NEARBY_PANEL_LINE_SECONDS;
		const step = dt / NEARBY_PANEL_FADE_SECONDS;
		if (record.fadingOut) {
			record.opacity = Math.max(0, record.opacity - step);
			// line retracts only once the panel it carries is gone
			if (record.opacity <= 0) {
				record.lineProgress = Math.max(0, record.lineProgress - lineStep);
			}
		} else {
			record.lineProgress = Math.min(1, record.lineProgress + lineStep);
			if (record.lineProgress >= 1) {
				record.opacity = Math.min(1, record.opacity + step);
			}
		}
		for (const material of record.fadeMaterials) {
			material.opacity = record.opacity;
		}
		record.line.visible = record.lineProgress > 0;
		if (record.fadingOut && record.opacity <= 0 && record.lineProgress <= 0) {
			disposeNearbyPanel(record);
			nearbyPanels.delete(index);
			return false;
		}
		return true;
	}

	// current selection, as respondent indices
	let nearbySelected = [];
	let nearbySelectionTimer = NEARBY_SELECTION_REFRESH_INTERVAL; // fills all slots on the very first frame
	// reused, to avoid reallocating each refresh
	const nearbyCandidates = [];
	function updateNearbyPersonInfo(dt) {
		if (!getInsideRoom() || getMode() !== "walk") {
			// dispose outright — nothing to position against once the view is gone
			for (const [index, record] of [...nearbyPanels]) {
				disposeNearbyPanel(record);
				nearbyPanels.delete(index);
			}
			nearbySelected = [];
			nearbySelectionTimer = NEARBY_SELECTION_REFRESH_INTERVAL;
			return;
		}

		// story text owns the screen: fade out, pick nobody new.
		// they keep tracking their person via the pass below
		if (getHasStoryText()) {
			for (const index of nearbySelected) dropNearbyPanel(index);
			nearbySelected = [];
			nearbySelectionTimer = NEARBY_SELECTION_REFRESH_INTERVAL;
		} else {
			// blockers: structure only
			const blockerMeshes = occluderMeshes;

			// cone = narrower of the fixed cone and the camera's horizontal fov,
			// less an edge margin. camera.fov is vertical, so convert
			const verticalHalfFovRad = THREE.MathUtils.degToRad(camera.fov / 2);
			const horizontalHalfFovRad = Math.atan(
				Math.tan(verticalHalfFovRad) * camera.aspect
			);
			const cosHalfAngle = Math.cos(
				Math.min(
					NEARBY_PERSON_FOV_HALF_ANGLE,
					Math.max(0, horizontalHalfFovRad - NEARBY_PERSON_FOV_SCREEN_MARGIN)
				)
			);

			// drops are immediate; only adds are throttled
			nearbySelected = nearbySelected.filter((index) => {
				if (
					qualifiesForNearbyPanel(index, blockerMeshes, cosHalfAngle) !== null
				)
					return true;
				dropNearbyPanel(index);
				return false;
			});

			nearbySelectionTimer += dt;
			if (nearbySelectionTimer >= NEARBY_SELECTION_REFRESH_INTERVAL) {
				nearbySelectionTimer = 0;

				// re-rank everyone, incl. the selected, so the set follows the
				// walker instead of freezing once the slots fill
				const incumbents = new Set(nearbySelected);
				nearbyCandidates.length = 0;
				for (let i = 0; i < personRoots.length; i++) {
					const distSq = qualifiesForNearbyPanel(
						i,
						blockerMeshes,
						cosHalfAngle
					);
					if (distSq === null) continue;
					// nothing displayable for this wave/variable
					if (
						formatNearbyPersonLines(
							respondents[i],
							getPositionMode(),
							getSelectedVariable()
						).length === 0
					) {
						continue;
					}
					// incumbents rank as if closer, so a marginal challenger doesn't
					// churn the selection and rebuild textures
					nearbyCandidates.push({
						index: i,
						rank: incumbents.has(i)
							? distSq * NEARBY_INCUMBENT_STICKINESS
							: distSq
					});
				}
				nearbyCandidates.sort((a, b) => a.rank - b.rank);

				const winners = nearbyCandidates
					.slice(0, NEARBY_PEOPLE_MAX)
					.map((candidate) => candidate.index);
				// losers give up their panel
				for (const index of nearbySelected) {
					if (!winners.includes(index)) dropNearbyPanel(index);
				}
				nearbySelected = winners;
			}

			// rebuild only if missing or stale. a reselected fading panel
			// just fades back in
			for (const index of nearbySelected) {
				let record = nearbyPanels.get(index);
				if (
					record &&
					(record.wave !== getPositionMode() ||
						record.variable !== getSelectedVariable())
				) {
					disposeNearbyPanel(record);
					record = null;
				}
				if (!record) {
					record = buildNearbyPanel(index);
					nearbyPanels.set(index, record);
				}
				record.fadingOut = false;
			}
		}

		// position every live panel, fading ones included
		for (const [index, record] of [...nearbyPanels]) {
			if (!advancePanelFade(index, record, dt)) continue;
			const headTop = computeHeadTopPoint(index);
			// to the pre-gap point; the gap is too small to warrant a second pass
			const distance = camera.position.distanceTo(headTop);
			// what plain perspective would give, clamped to stay legible
			const naturalApparentScale = NEARBY_PANEL_REFERENCE_DISTANCE / distance;
			const apparentScale = Math.min(
				NEARBY_PANEL_MAX_APPARENT_SCALE,
				Math.max(NEARBY_PANEL_MIN_APPARENT_SCALE, naturalApparentScale)
			);
			// apparent size -> world scale. inside the band these cancel to 1
			const scale =
				apparentScale * (distance / NEARBY_PANEL_REFERENCE_DISTANCE);
			// bottom edge sits a line-length plus gap above the head, so line
			// count grows the panel upward instead of into the face
			const halfPanelHeight = record.mesh.geometry.parameters.height / 2;
			const stemLength = NEARBY_PANEL_LINE_LENGTH + NEARBY_PERSON_HEAD_GAP;
			record.mesh.position.set(
				headTop.x,
				// stem scales with the panel
				headTop.y + (stemLength + halfPanelHeight) * scale,
				headTop.z
			);
			record.mesh.scale.setScalar(scale);
			// face the camera
			record.mesh.quaternion.copy(camera.quaternion);
			// stands on the head, drawn up to the panel's bottom edge
			record.line.position.copy(headTop);
			record.line.quaternion.copy(camera.quaternion);
			record.line.scale.set(
				NEARBY_PANEL_LINE_WIDTH * scale,
				stemLength * scale * record.lineProgress,
				1
			);
		}
	}
	return { update: updateNearbyPersonInfo };
}
