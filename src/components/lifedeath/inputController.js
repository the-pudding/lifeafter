import { wrapAngle } from "./roomMath.js";

/**
 * Pointer/touch gesture recognition for the first-person walk camera:
 * click-and-hold-drag to steer (yaw/pitch), scroll or vertical touch-drag
 * to walk forward/back, and click-vs-drag detection for
 * handleDoorClick/handlePersonClick in Main.lifedeath.svelte.
 *
 * Doesn't own the camera's actual position/orientation (renderWalkX/Z,
 * cameraYaw/Pitch, autoWalking, etc. stay in Main.lifedeath.svelte, read
 * every frame by the crowd/camera/minimap update) — just the raw gesture
 * state, and the target yaw/pitch/walk-forward it drives via the
 * getters/setters and `walk` callback passed in.
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
	dragLookRadiansPerSwipe,
	maxDragPitch,
	dragThresholdPx = 6
}) {
	// Non-null while the mouse button (or a touch) is down, holding the
	// last move event's position so each handler only looks at the delta since last time.
	let lastMouseDragX = null;
	let lastMouseDragY = null;
	let lastTouchX = null;
	let lastTouchY = null;
	// Where the mouse went down, held until the next mousedown so a
	// click's total drag distance can still be measured after mouseup has
	// already cleared lastMouseDragX/Y.
	let mouseDownX = null;
	let mouseDownY = null;
	// True once the current press/touch has moved past dragThresholdPx at
	// any point — unlike comparing the click event's own final position
	// against mouseDownX/Y, this also catches a drag that happens to end
	// back near where it started (steering left then right, say), which a
	// same-position distance check alone would wrongly let through as a
	// "click". Reset on the next mousedown/touchstart, not on
	// mouseup/touchend, since the synthetic "click"/tap event this gates
	// fires after those — read via the `hasDragged` getter below.
	let hasDragged = false;

	// Touch-only axis locking: a swipe commits to either steering (yaw)
	// or walking (Z), never both, decided by whichever axis moved first.
	let startTouchX = null;
	let startTouchY = null;
	let hasDeterminedDirection = false;
	let isSwipingHorizontally = false;
	let isSwipingVertically = false;

	function handleWheel(event) {
		if (getMode() !== "walk") return;
		event.preventDefault(); // don't also scroll the page
		walk(event.deltaY);
	}

	// Click-and-hold-drag steering: only turns the camera while the mouse
	// button is held (lastMouseDragX is non-null only between mousedown and mouseup).
	function handleMouseDown(event) {
		// Same guard as handleWheel — while the walk view is tucked into
		// the corner (top-down mode), it's a preview, not a control
		// surface. Without this, dragging anywhere over the (now much
		// bigger, full-bleed) top-down map still steered the walk camera
		// behind it, invisibly, so switching back to walk view could land
		// facing somewhere you never meant to look.
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
		// Inverted: drag up to look down, drag down to look up — clamped short of straight up/down.
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
		// Same guard as handleMouseDown/handleWheel — no steering/walking
		// while the walk view is just the top-down mode's small preview.
		if (getMode() !== "walk") return;
		const touch = event.touches[0];
		if (!touch) return;

		// Record the exact starting coordinates
		startTouchX = touch.clientX;
		startTouchY = touch.clientY;
		// Also feeds handleDoorClick's/handlePersonClick's tap-vs-drag
		// check in Main, same as handleMouseDown does for mouse input —
		// the synthetic "click" event browsers fire after a tap carries
		// these same coordinates.
		mouseDownX = touch.clientX;
		mouseDownY = touch.clientY;
		hasDragged = false;

		// Set the "last" coordinates for the first move calculation
		lastTouchX = touch.clientX;
		lastTouchY = touch.clientY;

		// Reset axis locks for the new swipe
		hasDeterminedDirection = false;
		isSwipingHorizontally = false;
		isSwipingVertically = false;
	}

	function handleTouchMove(event) {
		const touch = event.touches[0];
		if (!touch) return;

		// Prevent the browser from trying to scroll the page natively
		event.preventDefault();

		// 1. DETERMINE AND LOCK THE AXIS
		if (!hasDeterminedDirection) {
			const totalDx = touch.clientX - startTouchX;
			const totalDy = touch.clientY - startTouchY;

			// Wait until the user has moved at least 5 pixels to determine intent.
			// This prevents micro-jitters when they first touch the screen.
			if (Math.abs(totalDx) > 5 || Math.abs(totalDy) > 5) {
				if (Math.abs(totalDx) > Math.abs(totalDy)) {
					isSwipingHorizontally = true;
				} else {
					isSwipingVertically = true;
				}
				hasDeterminedDirection = true; // Lock it in
				// Unlike hasDeterminedDirection (reset by handleTouchEnd,
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
				// Horizontal drag -> Look around (Yaw)
				const dxNormalized = -dx / rect.width;
				setTargetCameraYaw(
					wrapAngle(getTargetCameraYaw() + dxNormalized * dragLookRadiansPerSwipe)
				);
			} else if (isSwipingVertically) {
				// Vertical drag -> Walk forward/backward (Z-axis)
				const dyNormalized = dy / rect.height;
				const fovScale = getCameraFov() / 60;
				const BASE_WALK_SPEED = 300;

				walk(dyNormalized * BASE_WALK_SPEED * fovScale);
			}
		}

		// 3. UPDATE LAST TOUCH COORDS
		lastTouchX = touch.clientX;
		lastTouchY = touch.clientY;
	}

	function handleTouchEnd() {
		// Clear out everything when the user lifts their finger
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
		// Listen on window (not just container) for mouseup, so releasing
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
		// True once the current press/touch has moved past dragThresholdPx
		// — handleDoorClick/handlePersonClick in Main read this to tell a
		// real click apart from the tail end of a drag.
		get hasDragged() {
			return hasDragged;
		}
	};
}
