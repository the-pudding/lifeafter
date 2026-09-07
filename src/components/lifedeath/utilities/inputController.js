import { wrapAngle } from "../room/roomMath.js";
import {
	MAX_WHEEL_STEP,
	WHEEL_FULL_SPEED_DELTA,
	WHEEL_RESPONSE_EXPONENT
} from "../room/roomConfig.js";

// raw wheel/swipe delta -> the delta the walker actually gets. keys and
// the door auto-walk don't come through here, so their own rates are
// untouched by the curve
function shapeWalkDelta(delta) {
	const magnitude = Math.min(1, Math.abs(delta) / WHEEL_FULL_SPEED_DELTA);
	return Math.sign(delta) * magnitude ** WHEEL_RESPONSE_EXPONENT * MAX_WHEEL_STEP;
}

/**
 * gesture recognition for the walk camera: drag to steer, scroll or
 * vertical touch-drag to walk, and click-vs-drag detection for Main's
 * click handlers.
 *
 * owns only the gesture state, not the camera itself — it drives target
 * yaw/pitch/walk through the accessors passed in.
 */
export function createInputController({
	container,
	getMode,
	getTargetCameraYaw,
	setTargetCameraYaw,
	getTargetCameraPitch,
	setTargetCameraPitch,
	walk,
	getCameraFov,
	// per-viewport damping on scroll/swipe walking; keys don't go through here
	getScrollWalkScale = () => 1,
	dragLookRadiansPerSwipe,
	maxDragPitch,
	dragThresholdPx = 6
}) {
	// non-null while pressed; holds the last position, for deltas
	let lastMouseDragX = null;
	let lastMouseDragY = null;
	let lastTouchX = null;
	let lastTouchY = null;
	// press origin, kept past mouseup so total drag distance survives
	let mouseDownX = null;
	let mouseDownY = null;
	// true once a press has moved past the threshold at any point, so a
	// there-and-back drag isn't mistaken for a click. reset on the next
	// press, since the synthetic "click" fires after mouseup
	let hasDragged = false;

	// touch: a swipe commits to steering or walking, by whichever moved first
	let startTouchX = null;
	let startTouchY = null;
	let hasDeterminedDirection = false;
	let isSwipingHorizontally = false;
	let isSwipingVertically = false;

	function handleWheel(event) {
		if (getMode() !== "walk") return;
		event.preventDefault(); // don't also scroll the page
		walk(shapeWalkDelta(event.deltaY) * getScrollWalkScale());
	}

	// steers only while held
	function handleMouseDown(event) {
		// the cornered preview isn't a control surface — dragging the topdown
		// map used to steer the hidden walk camera
		if (getMode() !== "walk") return;
		lastMouseDragX = event.clientX;
		lastMouseDragY = event.clientY;
		mouseDownX = event.clientX;
		mouseDownY = event.clientY;
		hasDragged = false;
		container.style.cursor = "grab";
	}

	function handleMouseMove(event) {
		if (lastMouseDragX === null) return;
		if (!hasDragged && mouseDownX !== null) {
			const totalDist = Math.hypot(
				event.clientX - mouseDownX,
				event.clientY - mouseDownY
			);
			if (totalDist > dragThresholdPx) hasDragged = true;
		}
		const rect = container.getBoundingClientRect();
		const dxNormalized = (lastMouseDragX - event.clientX) / rect.width;
		setTargetCameraYaw(
			wrapAngle(getTargetCameraYaw() + dxNormalized * dragLookRadiansPerSwipe)
		);
		lastMouseDragX = event.clientX;
		// inverted: drag up to look down, drag down to look up — clamped short of straight up/down.
		const dyNormalized = (event.clientY - lastMouseDragY) / rect.height;
		setTargetCameraPitch(
			Math.max(
				-maxDragPitch,
				Math.min(
					maxDragPitch,
					getTargetCameraPitch() + dyNormalized * dragLookRadiansPerSwipe
				)
			)
		);
		lastMouseDragY = event.clientY;
	}

	function handleMouseUp() {
		lastMouseDragX = null;
		lastMouseDragY = null;
		container.style.cursor = "all-scroll";
	}

	function handleTouchStart(event) {
		// same guard as handleMouseDown/handleWheel — no steering/walking
		// while the walk view is just the top-down mode's small preview.
		if (getMode() !== "walk") return;
		const touch = event.touches[0];
		if (!touch) return;

		// starting coordinates
		startTouchX = touch.clientX;
		startTouchY = touch.clientY;
		// feeds Main's tap-vs-drag check, like handleMouseDown does
		mouseDownX = touch.clientX;
		mouseDownY = touch.clientY;
		hasDragged = false;

		// seed for the first move delta
		lastTouchX = touch.clientX;
		lastTouchY = touch.clientY;

		// reset axis locks for the new swipe
		hasDeterminedDirection = false;
		isSwipingHorizontally = false;
		isSwipingVertically = false;
	}

	function handleTouchMove(event) {
		const touch = event.touches[0];
		if (!touch) return;

		// prevent the browser from trying to scroll the page natively
		event.preventDefault();

		// 1. DETERMINE AND LOCK THE AXIS
		if (!hasDeterminedDirection) {
			const totalDx = touch.clientX - startTouchX;
			const totalDy = touch.clientY - startTouchY;

			// wait until the user has moved at least 5 pixels to determine intent.
			// this prevents micro-jitters when they first touch the screen.
			if (Math.abs(totalDx) > 5 || Math.abs(totalDy) > 5) {
				if (Math.abs(totalDx) > Math.abs(totalDy)) {
					isSwipingHorizontally = true;
				} else {
					isSwipingVertically = true;
				}
				hasDeterminedDirection = true; // Lock it in
				// unlike hasDeterminedDirection (reset by handleTouchEnd,
				// which fires before the synthetic click/tap event this
				// gates), this survives until the next touchstart.
				hasDragged = true;
			}
		}

		// 2. APPLY MOVEMENT (Only if the axis has been locked)
		if (hasDeterminedDirection && lastTouchX !== null && lastTouchY !== null) {
			const dx = touch.clientX - lastTouchX;
			const dy = touch.clientY - lastTouchY;
			const rect = container.getBoundingClientRect();

			if (isSwipingHorizontally) {
				// horizontal drag -> Look around (Yaw)
				const dxNormalized = -dx / rect.width;
				setTargetCameraYaw(
					wrapAngle(getTargetCameraYaw() + dxNormalized * dragLookRadiansPerSwipe)
				);
			} else if (isSwipingVertically) {
				// vertical drag -> Walk forward/backward (Z-axis)
				const dyNormalized = dy / rect.height;
				const fovScale = getCameraFov() / 60;
				const BASE_WALK_SPEED = 300;

				walk(
					shapeWalkDelta(dyNormalized * BASE_WALK_SPEED * fovScale) *
						getScrollWalkScale()
				);
			}
		}

		// 3. UPDATE LAST TOUCH COORDS
		lastTouchX = touch.clientX;
		lastTouchY = touch.clientY;
	}

	function handleTouchEnd() {
		// clear out everything when the user lifts their finger
		lastTouchX = null;
		lastTouchY = null;
		startTouchX = null;
		startTouchY = null;

		hasDeterminedDirection = false;
		isSwipingHorizontally = false;
		isSwipingVertically = false;
	}

	function attach() {
		// Idle cursor hints that you can scroll here; handleMouseDown/Up
		// swap it to "grab" for the duration of an actual drag.
		container.style.cursor = "all-scroll";
		container.addEventListener("wheel", handleWheel, { passive: false });
		container.addEventListener("mousedown", handleMouseDown);
		container.addEventListener("mousemove", handleMouseMove);
		// listen on window (not just container) for mouseup, so releasing
		// the button after dragging off the canvas still stops the drag.
		window.addEventListener("mouseup", handleMouseUp);
		container.addEventListener("touchstart", handleTouchStart, { passive: false });
		container.addEventListener("touchmove", handleTouchMove, { passive: false });
		container.addEventListener("touchend", handleTouchEnd);
		container.addEventListener("touchcancel", handleTouchEnd);
	}

	function detach() {
		container.removeEventListener("wheel", handleWheel);
		container.removeEventListener("mousedown", handleMouseDown);
		container.removeEventListener("mousemove", handleMouseMove);
		window.removeEventListener("mouseup", handleMouseUp);
		container.removeEventListener("touchstart", handleTouchStart);
		container.removeEventListener("touchmove", handleTouchMove);
		container.removeEventListener("touchend", handleTouchEnd);
		container.removeEventListener("touchcancel", handleTouchEnd);
	}

	return {
		attach,
		detach,
		// true once the current press/touch has moved past dragThresholdPx
		// — handleDoorClick/handlePersonClick in Main read this to tell a
		// real click apart from the tail end of a drag.
		get hasDragged() {
			return hasDragged;
		}
	};
}
