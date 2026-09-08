import * as THREE from "three";
import { makeLabelPanel } from "../utilities/textPanel.js";
import { formatNearbyPersonLines } from "./personSummary.js";
import {
	FACE_CAMERA_RADIUS,
	FIGURE_HEIGHT,
	NEARBY_INCUMBENT_STICKINESS,
	NEARBY_PANEL_MAX_APPARENT_SCALE,
	NEARBY_PANEL_MIN_APPARENT_SCALE,
	NEARBY_PANEL_MAX_FOV_SCALE,
	NEARBY_PANEL_REFERENCE_FOV,
	NEARBY_PANEL_REFERENCE_DISTANCE,
	NEARBY_PANEL_WORLD_WIDTH,
	NEARBY_PEOPLE_MAX,
	NEARBY_PERSON_FOV_HALF_ANGLE,
	NEARBY_PERSON_FOV_SCREEN_MARGIN,
	NEARBY_PERSON_HEAD_GAP,
	NEARBY_PERSON_MAX_DISTANCE,
	NEARBY_PANEL_FADE_SECONDS,
	NEARBY_PANEL_LINE_COLOR,
	NEARBY_PANEL_LINE_LENGTH,
	NEARBY_PANEL_LINE_OPACITY,
	NEARBY_PANEL_LINE_SECONDS,
	NEARBY_PANEL_LINE_WIDTH,
	NEARBY_SELECTION_REFRESH_INTERVAL
} from "./peopleConfig.js";

// info panels above nearby crowd members: picking, building, placing
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
	getHasStoryText,
	// whoever the pointer is over, who gets a panel whatever the selection
	// rules say — it's a deliberate ask, not a proximity guess
	getHoveredPersonIndex = () => null
}) {
	// max anisotropy, read once
	const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();

	// panel scale for the current fov, so it holds its pixel size
	function viewportPanelScale() {
		const referenceHalfFov = THREE.MathUtils.degToRad(
			NEARBY_PANEL_REFERENCE_FOV / 2
		);
		const halfFov = THREE.MathUtils.degToRad(camera.fov / 2);
		const scale = Math.tan(halfFov) / Math.tan(referenceHalfFov);
		return Math.min(NEARBY_PANEL_MAX_FOV_SCALE, Math.max(1, scale));
	}

	const nearbyVisibilityRaycaster = new THREE.Raycaster();
	const nearbyVisibilityDirection = new THREE.Vector3();
	// sq. distance if this person qualifies, else null
	function qualifiesForNearbyPanel(index, blockerMeshes, cosHalfAngle) {
		const root = personRoots[index];
		if (!root.visible) return null;
		const dx = root.position.x - getRenderWalkX();
		const dz = root.position.z - getRenderWalkZ();
		const distSq = dx * dx + dz * dz;
		if (distSq >= NEARBY_PERSON_MAX_DISTANCE * NEARBY_PERSON_MAX_DISTANCE)
			return null;
		// unit forward, so the dot avoids a sqrt
		const forwardX = Math.sin(getCameraYaw());
		const forwardZ = -Math.cos(getCameraYaw());
		const dot = dx * forwardX + dz * forwardZ;
		if (dot <= 0 || dot * dot < cosHalfAngle * cosHalfAngle * distSq) {
			return null;
		}
		// line of sight against structure only
		const headTop = computeHeadTopPoint(index);
		nearbyVisibilityDirection.subVectors(headTop, camera.position);
		const distanceToHead = nearbyVisibilityDirection.length();
		nearbyVisibilityDirection.normalize();
		nearbyVisibilityRaycaster.set(camera.position, nearbyVisibilityDirection);
		// stop short of the head, or their own body blocks it
		nearbyVisibilityRaycaster.far = distanceToHead - 0.05;
		if (
			nearbyVisibilityRaycaster.intersectObjects(blockerMeshes, true).length > 0
		) {
			return null;
		}
		return distSq;
	}

	// head height from the bbox, cached and de-scaled so breathing can't bob it
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
		// feet at y=0, so max.y is the height
		const breathFreeHeight =
			root.scale.y > 0 ? nearbyHeadBox.max.y / root.scale.y : 0;
		const baseHeightScale =
			respondents[index].__heightScale * walkerScaleCorrection;
		const height = breathFreeHeight * baseHeightScale;
		nearbyStableHeadHeights.set(index, height);
		return height;
	}
	// head top: x/z live, y fixed
	function computeHeadTopPoint(index) {
		const root = personRoots[index];
		nearbyHeadTopPoint.set(
			root.position.x,
			stableHeadHeight(index),
			root.position.z
		);
		return nearbyHeadTopPoint;
	}

	// leader line: a unit quad on its own origin, so scale.y is its length
	const nearbyLineGeometry = new THREE.PlaneGeometry(1, 1).translate(0, 0.5, 0);
	const nearbyLineMaterial = new THREE.MeshBasicMaterial({
		color: NEARBY_PANEL_LINE_COLOR,
		// matches the panel's border. depth-tested but never writes depth
		transparent: true,
		opacity: NEARBY_PANEL_LINE_OPACITY,
		depthTest: true,
		depthWrite: false,
		side: THREE.DoubleSide
	});
	nearbyLineMaterial.userData.outlineParameters = { visible: false };

	// live panels by person index; wave+variable are the texture cache key
	const nearbyPanels = new Map();
	function disposeNearbyPanel(record) {
		// the line's geometry and material are shared, so only unparent it
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
		// only the face materials carry the canvas
		const fadeMaterials = (
			Array.isArray(mesh.material) ? mesh.material : [mesh.material]
		).filter((material) => material.map);
		for (const material of fadeMaterials) material.opacity = 0;
		// wave and variable are the cache key for the texture
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
	// mark for fade-out; the update loop disposes it at zero
	function dropNearbyPanel(index) {
		const record = nearbyPanels.get(index);
		if (record) record.fadingOut = true;
	}
	// draws the line, then fades the panel in; reversed on the way out
	function advancePanelFade(index, record, dt) {
		const lineStep = dt / NEARBY_PANEL_LINE_SECONDS;
		const step = dt / NEARBY_PANEL_FADE_SECONDS;
		if (record.fadingOut) {
			record.opacity = Math.max(0, record.opacity - step);
			// the line retracts only once its panel is gone
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

	// currently selected respondent indices
	let nearbySelected = [];
	let nearbySelectionTimer = NEARBY_SELECTION_REFRESH_INTERVAL; // fills all slots on the very first frame
	// reused each refresh
	const nearbyCandidates = [];
	function updateNearbyPersonInfo(dt) {
		if (!getInsideRoom() || getMode() !== "walk") {
			// nothing to position against, so dispose outright
			for (const [index, record] of [...nearbyPanels]) {
				disposeNearbyPanel(record);
				nearbyPanels.delete(index);
			}
			nearbySelected = [];
			nearbySelectionTimer = NEARBY_SELECTION_REFRESH_INTERVAL;
			return;
		}

		// the pointer's own pick, if they're still on screen
		const hovered = getHoveredPersonIndex();
		const hoveredIndex =
			hovered !== null && hovered !== undefined && personRoots[hovered]?.visible
				? hovered
				: null;

		// story text owns the screen: fade out and pick nobody new, except
		// whoever they're pointing at
		if (getHasStoryText()) {
			for (const index of nearbySelected) {
				if (index !== hoveredIndex) dropNearbyPanel(index);
			}
			nearbySelected = hoveredIndex === null ? [] : [hoveredIndex];
			nearbySelectionTimer = NEARBY_SELECTION_REFRESH_INTERVAL;
		} else {
			// structure blocks line of sight, people don't
			const blockerMeshes = occluderMeshes;

			// selection cone: the narrower of the fixed cone and the camera's
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
				if (index === hoveredIndex) return true;
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

				// re-rank everyone, so the set follows the walker
				const incumbents = new Set(nearbySelected);
				nearbyCandidates.length = 0;
				for (let i = 0; i < personRoots.length; i++) {
					const distSq = qualifiesForNearbyPanel(
						i,
						blockerMeshes,
						cosHalfAngle
					);
					if (distSq === null) continue;
					// nothing to show for this wave and variable
					if (
						formatNearbyPersonLines(
							respondents[i],
							getPositionMode(),
							getSelectedVariable()
						).length === 0
					) {
						continue;
					}
					// incumbents rank as if closer, so the set doesn't churn
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
				if (hoveredIndex !== null && !winners.includes(hoveredIndex)) {
					winners.push(hoveredIndex);
				}
				// losers give up their panel
				for (const index of nearbySelected) {
					if (!winners.includes(index)) dropNearbyPanel(index);
				}
				nearbySelected = winners;
			}

		}

		// build whatever the selection settled on, story text or not, so a
		// hovered person still gets their panel. only if missing or stale
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

		// place every live panel, fading ones included
		const viewportScale = viewportPanelScale();
		for (const [index, record] of [...nearbyPanels]) {
			if (!advancePanelFade(index, record, dt)) continue;
			const headTop = computeHeadTopPoint(index);
			// measured to the head, not the panel
			const distance = camera.position.distanceTo(headTop);
			// plain perspective, clamped to stay legible
			const naturalApparentScale = NEARBY_PANEL_REFERENCE_DISTANCE / distance;
			const apparentScale =
				Math.min(
					NEARBY_PANEL_MAX_APPARENT_SCALE,
					Math.max(NEARBY_PANEL_MIN_APPARENT_SCALE, naturalApparentScale)
				) * viewportScale;
			// apparent size back to world scale
			const scale =
				apparentScale * (distance / NEARBY_PANEL_REFERENCE_DISTANCE);
			// anchored by its bottom edge, so it grows upward
			const halfPanelHeight = record.mesh.geometry.parameters.height / 2;
			const stemLength = NEARBY_PANEL_LINE_LENGTH + NEARBY_PERSON_HEAD_GAP;
			record.mesh.position.set(
				headTop.x,
				// the stem scales with the panel
				headTop.y + (stemLength + halfPanelHeight) * scale,
				headTop.z
			);
			record.mesh.scale.setScalar(scale);
			// face the camera
			record.mesh.quaternion.copy(camera.quaternion);
			// stands on the head, drawn up to the panel
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
