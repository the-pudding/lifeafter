import * as THREE from "three";

// Wraps a canvas (already drawn) in a thin box mesh instead of a flat
// plane — a zero-depth plane is exactly the geometry that breaks
// OutlineEffect's inflated-backface trick at grazing view angles and,
// combined with occasional z-fighting against whatever it's mounted on,
// was making signage intermittently vanish. Real (if slight) volume
// gives it a front/back face that can't land exactly on the same plane
// as anything else. Shared by makeTextPanel and makeSvgNeonPanel below.
function wrapCanvasInPanel(canvas, width, height, depthBiasUnits = -4) {
	const texture = new THREE.CanvasTexture(canvas);
	const faceMaterial = new THREE.MeshBasicMaterial({
		map: texture,
		transparent: true,
		// Deliberately NOT DoubleSide: this same material is assigned to
		// both the box's +z and -z face groups below, and side defaults
		// to FrontSide, so each group is culled independently by its own
		// triangle winding — from any one camera position exactly one of
		// the two ever rasterizes (the far one is backface-culled before
		// it draws at all). That's what keeps the two faces from fighting
		// over the same pixels now that depthTest is off (see below):
		// DoubleSide would rasterize *both* every frame, and with no
		// depth test to reject the farther one, the -z group (drawn
		// second, and mirrored since it's being viewed from its own
		// backside) was winning over the correct +z face — the sign read
		// backwards. This still shows the (mirrored) back face once a
		// door swings open and you're viewing it from the room side,
		// same as DoubleSide did, just without the two ever overlapping.
		//
		// depthTest was briefly disabled here to fight brick-outline
		// pokethrough on the building sign, but that let every sign/label
		// ignore ALL occluders — including interior walls and closed
		// doors, so exterior neon showed straight through into the room.
		// The sign's own pokethrough problem is now solved independently
		// by the signBacking plate in facade.js (a normal depth-tested
		// occluder sized to sit behind just the sign), so a real depth
		// test can be restored here and everything still occludes
		// normally, both ways.
		depthTest: true,
		depthWrite: true,
		// polygonOffset nudges the *written* depth slightly toward the
		// camera, purely to win ordinary z-fighting against whatever this
		// panel is mounted flush against (door panel, brick facade).
		// factor is deliberately 0, not just "small" — it scales with the
		// polygon's own screen-space depth *slope*, which blows up at
		// grazing viewing angles (looking at a panel nearly edge-on), and
		// was making that part of the bias wildly inconsistent between
		// panels depending on the exact angle they were being viewed from.
		// units (a flat, angle-independent bias) is the real fix for the
		// specific bug this was chasing: the building sign (see facade.js's
		// signGroup) sits close enough above a door, and at large enough
		// scale (see Main's own MAX_SIGN_SCALE, mobile legibility) tall
		// enough, that its bounding box genuinely does overlap the door's
		// own label at a steep enough viewing angle — a real depth
		// conflict, correctly resolved by whichever one is actually
		// closer, which happened to be the sign. depthBiasUnits lets a
		// caller ask for a stronger pull-toward-camera than the default
		// (see makeTextPanel's own param, and doors.js's use of it for
		// exactly this) so door labels reliably win that kind of
		// ambiguous-depth conflict against other signage without having to
		// relocate anything.
		polygonOffset: true,
		polygonOffsetFactor: 0,
		polygonOffsetUnits: depthBiasUnits
	});
	// Fully invisible, not a dark edge color: the canvas (and so this
	// box) is sized to the panel's full width/height, well beyond the
	// actual glyphs (room for line-wrapping/glow blur) — an opaque edge
	// there rendered as a big rectangular bar/outline around the sign
	// instead of hugging the text, which read as a stray shadow. This
	// still gives the mesh real depth for the z-fighting fix above
	// without ever being seen itself.
	const edgeMaterial = new THREE.MeshBasicMaterial({
		transparent: true,
		opacity: 0,
		depthWrite: false
	});
	const depth = Math.min(width, height) * 0.05;
	const geometry = new THREE.BoxGeometry(width, height, depth);
	// BoxGeometry's face groups are ordered [+x, -x, +y, -y, +z, -z] —
	// the canvas texture goes on the front/back (+z/-z), the thin edges
	// (the sides) get the invisible material above.
	const materials = [
		edgeMaterial,
		edgeMaterial,
		edgeMaterial,
		edgeMaterial,
		faceMaterial,
		faceMaterial
	];
	// The box's own rectangular silhouette (the full canvas bounds, not
	// the glyphs) would otherwise get outlined as a big dumb rectangle —
	// same reason the old flat plane suppressed it.
	faceMaterial.userData.outlineParameters = { visible: false };
	edgeMaterial.userData.outlineParameters = { visible: false };
	const mesh = new THREE.Mesh(geometry, materials);
	mesh.renderOrder = 10;
	return { mesh, texture };
}

// Renders text onto a canvas and wraps it in an unlit plane —
// dependency-free, no font asset needed for real TextGeometry.
// `neon` draws two shadow-blur passes for a glowing-tube look;
// `text` may be a string or an array of lines stacked top to bottom.
// Shared by the facade's building sign and each door's own label.
export function makeTextPanel(
	text,
	{ width, height, fontSize, color = "#ff29d8", neon = true, depthBiasUnits }
) {
	const lines = Array.isArray(text) ? text : [text];
	const canvas = document.createElement("canvas");
	canvas.width = 724;
	canvas.height = Math.round(724 * (height / width));
	const ctx = canvas.getContext("2d");
	ctx.font = `400 ${fontSize}px "Menlo", mono`;
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	const cx = canvas.width / 2;
	const maxWidth = canvas.width * 0.94;
	const lineHeight = canvas.height / (lines.length + 3);
	for (let i = 0; i < lines.length; i++) {
		const cy = lineHeight * (i + 1);
		const lineText = lines[i]; // Corrected string variable usage

		if (neon) {
			// 1. Crisp Neon Outline (Defines the glass edge sharply)
			ctx.save();
			ctx.strokeStyle = color;
			ctx.lineWidth = 4;
			ctx.shadowColor = color;
			ctx.shadowBlur = 10;
			ctx.strokeText(lineText, cx, cy, maxWidth);
			ctx.restore();

			// 2. Tight Color Glow (Minimal blur to prevent light wash out)
			ctx.save();
			ctx.fillStyle = color;
			ctx.shadowColor = color;
			ctx.shadowBlur = 4;
			ctx.fillText(lineText, cx, cy, maxWidth);
			ctx.restore();

			// 3. Sharp White Core (Pure white tube center, 0 blur for max legibility)
			ctx.save();
			ctx.fillStyle = "#ffffff";
			ctx.shadowColor = "transparent";
			ctx.shadowBlur = 0;
			ctx.fillText(lineText, cx, cy, maxWidth);
			ctx.restore();
		} else {
			ctx.fillStyle = color;
			ctx.fillText(lineText, cx, cy, maxWidth);
		}
	}
	return wrapCanvasInPanel(canvas, width, height, depthBiasUnits).mesh;
}

// Same idea as makeTextPanel's neon effect, but rasterizing an SVG
// wordmark instead of drawing text. The mesh returns immediately with a
// blank canvas — decoding the SVG into an <img> is unavoidably async —
// and the texture fills in a frame or two later once it loads.
//
// `width`/`height` are the logo's own visible size — the canvas (and the
// mesh plane it's wrapped in) are sized larger, by `glowPadding`, and the
// logo is drawn shrunk/centered within that margin. Drawing it edge-to-
// edge in a canvas sized exactly to the logo left no room for the
// shadowBlur glow to spread into — it just got clipped at the canvas
// boundary, same as it would in 3D if the mesh plane stopped exactly at
// the logo's own bounds.
//
// `color` recolors the wordmark's own fill (the letterforms themselves);
// `glowColor` (defaults to `color`) is just the halo around them — split
// out so a white wordmark can still sit inside a colored neon glow
// instead of the glow always matching the letterform color.
export function makeSvgNeonPanel(
	svgMarkup,
	{
		width,
		height,
		color = "#ff29d8",
		glowColor = color,
		glowPadding = 0.8,
		depthBiasUnits
	}
) {
	const panelWidth = width * (1 + glowPadding);
	const panelHeight = height * (1 + glowPadding);
	// Resolution is picked so the SHORTER side never drops below
	// MIN_DIMENSION, not just a flat 1024 on the width — a fixed width
	// starves wide/flat SVGs (the building sign's 318x63 viewBox, ~5:1,
	// is the most extreme: 1024 wide worked out to only ~205px tall).
	// That's plenty of resolution for a filled script wordmark, which
	// hides a coarse raster well, but the sign draws a thin neon-tube
	// *stroke* outline — exactly the kind of fine detail that shows
	// visible pixelation first once the shorter dimension gets this low.
	const BASE_RESOLUTION = 1024;
	const MIN_DIMENSION = 480;
	const canvas = document.createElement("canvas");
	if (panelWidth >= panelHeight) {
		canvas.height = Math.max(
			MIN_DIMENSION,
			Math.round(BASE_RESOLUTION * (panelHeight / panelWidth))
		);
		canvas.width = Math.round(canvas.height * (panelWidth / panelHeight));
	} else {
		canvas.width = Math.max(
			MIN_DIMENSION,
			Math.round(BASE_RESOLUTION * (panelWidth / panelHeight))
		);
		canvas.height = Math.round(canvas.width * (panelHeight / panelWidth));
	}
	const ctx = canvas.getContext("2d");
	const { mesh, texture } = wrapCanvasInPanel(
		canvas,
		panelWidth,
		panelHeight,
		depthBiasUnits
	);

	// The wordmark's dark letterform fill becomes the neon color; its
	// light "bubble" highlight fill stays white, reused directly as the
	// neon effect's own sharp hot-core highlights (see the white-fill
	// pass in makeTextPanel above) instead of drawing those separately.
	const recolored = svgMarkup
		.replace(/fill="black"/gi, `fill="${color}"`)
		.replace(/fill="#000000"/gi, `fill="${color}"`)
		.replace(/fill="#000"/gi, `fill="${color}"`);
	const blob = new Blob([recolored], { type: "image/svg+xml" });
	const url = URL.createObjectURL(blob);
	const img = new Image();
	img.onload = () => {
		const drawWidth = canvas.width / (1 + glowPadding);
		const drawHeight = canvas.height / (1 + glowPadding);
		const offsetX = (canvas.width - drawWidth) / 2;
		const offsetY = (canvas.height - drawHeight) / 2;
		// Neon glow: a couple of blurred passes build the soft halo, then
		// one crisp final pass on top for the sharp edge — same
		// stroke/glow/core layering idea as makeTextPanel's neon text,
		// just operating on a rasterized image instead of drawn glyphs.
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.save();
		ctx.shadowColor = glowColor;
		ctx.shadowBlur = 55;
		ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
		ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
		ctx.restore();
		ctx.save();
		ctx.shadowColor = glowColor;
		ctx.shadowBlur = 16;
		ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
		ctx.restore();
		ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
		texture.needsUpdate = true;
		URL.revokeObjectURL(url);
	};
	img.src = url;

	return mesh;
}
