import { wrapAngle } from "../room/roomMath.js";
import {
	MAX_WHEEL_STEP,
	TOUCH_FULL_SPEED_DELTA,
	WHEEL_FULL_SPEED_DELTA,
	WHEEL_RESPONSE_EXPONENT
} from "../room/roomConfig.js";

// shapes a raw wheel or swipe delta into the delta the walker gets
function shapeWalkDelta(delta, fullSpeedDelta = WHEEL_FULL_SPEED_DELTA) {
	const magnitude = Math.min(1, Math.abs(delta) / fullSpeedDelta);
	return Math.sign(delta) * magnitude ** WHEEL_RESPONSE_EXPONENT * MAX_WHEEL_STEP;
}

// gestures for the walk camera: drag to steer, scroll or swipe to walk
export function createInputController({
	container,
	getMode,
	getTargetCameraYaw,
	setTargetCameraYaw,
	getTargetCameraPitch,
	setTargetCameraPitch,
	walk,
	getCameraFov,
	// per-viewport damping on scroll and swipe walking
	getScrollWalkScale = () => 1,
	dragLookRadiansPerSwipe,
	maxDragPitch,
	dragThresholdPx = 6
}) {
	// last pointer position while pressed, for deltas
	let lastMouseDragX = null;
	let lastMouseDragY = null;
	let lastTouchX = null;
	let lastTouchY = null;
	// press origin, kept past mouseup for the total drag distance
	let mouseDownX = null;
	let mouseDownY = null;
	// true once a press has moved past the drag threshold
	let hasDragged = false;

	// a swipe locks to steering or walking, by whichever axis moved first
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
		// the cornered preview isn't a control surface
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
		// inverted, and clamped short of straight up or down
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
		// no steering while the walk view is only the topdown preview
		if (getMode() !== "walk") return;
		const touch = event.touches[0];
		if (!touch) return;

		// swipe origin
		startTouchX = touch.clientX;
		startTouchY = touch.clientY;
		// feeds main's tap-vs-drag check
		mouseDownX = touch.clientX;
		mouseDownY = touch.clientY;
		hasDragged = false;

		// seed for the first move delta
		lastTouchX = touch.clientX;
		lastTouchY = touch.clientY;

		// reset the axis lock for a new swipe
		hasDeterminedDirection = false;
		isSwipingHorizontally = false;
		isSwipingVertically = false;
	}

	function handleTouchMove(event) {
		const touch = event.touches[0];
		if (!touch) return;

		// stop the browser scrolling the page instead
		event.preventDefault();

		// lock the swipe to an axis
		if (!hasDeterminedDirection) {
			const totalDx = touch.clientX - startTouchX;
			const totalDy = touch.clientY - startTouchY;

			// wait for real movement, so a touch doesn't jitter into an axis
			if (Math.abs(totalDx) > 5 || Math.abs(totalDy) > 5) {
				if (Math.abs(totalDx) > Math.abs(totalDy)) {
					isSwipingHorizontally = true;
				} else {
					isSwipingVertically = true;
				}
				hasDeterminedDirection = true; // Lock it in
				// survives until the next touchstart, unlike the axis lock
				hasDragged = true;
			}
		}

		// move along the locked axis
		if (hasDeterminedDirection && lastTouchX !== null && lastTouchY !== null) {
			const dx = touch.clientX - lastTouchX;
			const dy = touch.clientY - lastTouchY;
			const rect = container.getBoundingClientRect();

			if (isSwipingHorizontally) {
				// horizontal drag steers
				const dxNormalized = -dx / rect.width;
				setTargetCameraYaw(
					wrapAngle(getTargetCameraYaw() + dxNormalized * dragLookRadiansPerSwipe)
				);
			} else if (isSwipingVertically) {
				// vertical drag walks
				const dyNormalized = dy / rect.height;
				const fovScale = getCameraFov() / 60;
				const BASE_WALK_SPEED = 300;

				walk(
					shapeWalkDelta(
						dyNormalized * BASE_WALK_SPEED * fovScale,
						TOUCH_FULL_SPEED_DELTA
					) * getScrollWalkScale()
				);
			}
		}

		// carry the position for the next delta
		lastTouchX = touch.clientX;
		lastTouchY = touch.clientY;
	}

	function handleTouchEnd() {
		// clear everything when the finger lifts
		lastTouchX = null;
		lastTouchY = null;
		startTouchX = null;
		startTouchY = null;

		hasDeterminedDirection = false;
		isSwipingHorizontally = false;
		isSwipingVertically = false;
	}

	function attach() {
		// idle cursor hints that this scrolls; a drag swaps it to "grab"
		container.style.cursor = "all-scroll";
		container.addEventListener("wheel", handleWheel, { passive: false });
		container.addEventListener("mousedown", handleMouseDown);
		container.addEventListener("mousemove", handleMouseMove);
		// on window, so releasing off the canvas still ends the drag
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
		// read by main's click handlers to tell a click from the end of a drag
		get hasDragged() {
			return hasDragged;
		}
	};
}
