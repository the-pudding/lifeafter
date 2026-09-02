import * as THREE from "three";

// wraps a drawn canvas in a thin box; a flat plane broke OutlineEffect
// and z-fought its mount
function wrapCanvasInPanel(canvas, width, height, depthBiasUnits = -4, anisotropy = 1) {
	const texture = new THREE.CanvasTexture(canvas);
	// the canvas is drawn in sRGB; without this three treats it as linear
	// and the text renders washed out.
	texture.colorSpace = THREE.SRGBColorSpace;
	// always minified, and at anisotropy 1 the mip filter softens the text
	texture.anisotropy = anisotropy;
	const faceMaterial = new THREE.MeshBasicMaterial({
		map: texture,
		transparent: true,
		// not DoubleSide: this material goes on both the +z and -z faces, and
		// FrontSide culling means exactly one ever rasterizes. DoubleSide let
		// the mirrored back face win and the sign read backwards.
		depthTest: true,
		depthWrite: true,
		// pulls written depth toward the camera to win z-fighting against the
		// surface this is mounted on. factor stays 0 because it scales with
		// the polygon's depth slope, which blows up at grazing angles; units
		// is the flat, angle-independent bias that actually works.
		polygonOffset: true,
		polygonOffsetFactor: 0,
		polygonOffsetUnits: depthBiasUnits
	});
	// invisible: the box is sized to the full canvas, so a visible edge
	// would draw a bar around the sign rather than hug the text.
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
	// otherwise the box's full rectangle gets outlined, not the glyphs.
	faceMaterial.userData.outlineParameters = { visible: false };
	edgeMaterial.userData.outlineParameters = { visible: false };
	const mesh = new THREE.Mesh(geometry, materials);
	mesh.renderOrder = 10;
	return { mesh, texture };
}

// draws text to a canvas and wraps it, avoiding a font asset for real
// TextGeometry. `neon` adds blur passes for a glowing-tube look.
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
			// 1. crisp Neon Outline (Defines the glass edge sharply)
			ctx.save();
			ctx.strokeStyle = color;
			ctx.lineWidth = 4;
			ctx.shadowColor = color;
			ctx.shadowBlur = 10;
			ctx.strokeText(lineText, cx, cy, maxWidth);
			ctx.restore();

			// 2. tight Color Glow (Minimal blur to prevent light wash out)
			ctx.save();
			ctx.fillStyle = color;
			ctx.shadowColor = color;
			ctx.shadowBlur = 4;
			ctx.fillText(lineText, cx, cy, maxWidth);
			ctx.restore();

			// 3. sharp White Core (Pure white tube center, 0 blur for max legibility)
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

// dark panel of text lines, same depth-tested box as the others. lines
// wrap to `width`. entries are strings or { text, color }. returns the
// texture too, since callers rebuild and must dispose it
export function makeLabelPanel(
	lines,
	{
		width,
		// ~33-35 monospace characters per line. much larger and ordinary
		// lines wrap needlessly, stacking the panel up person-height.
		fontSizeFraction = 0.0465,
		color = "#ffffff",
		background = "rgba(0, 0, 0, 0.82)",
		borderColor = "rgba(255, 255, 255, 0.35)",
		depthBiasUnits,
		anisotropy = 1
	}
) {
	// reference resolution for drawing. on-screen size comes from `width`,
	// and every measurement below is a fraction of this, so raising it is a
	// pure supersample: same layout, more texels per glyph.
	const CANVAS_WIDTH = 1024;
	const fontSizePx = CANVAS_WIDTH * fontSizeFraction;
	const lineHeightPx = fontSizePx * 1.5;
	const paddingPx = fontSizePx * 0.6;
	const maxTextWidthPx = CANVAS_WIDTH - paddingPx * 2;

	// greedily word-wraps each line to fit maxTextWidthPx, measured against
	// the real font metrics.
	const measureCtx = document.createElement("canvas").getContext("2d");
	measureCtx.font = `400 ${fontSizePx}px "Menlo", monospace`;
	function wrapLine(entry) {
		const text = typeof entry === "string" ? entry : entry.text;
		const lineColor = typeof entry === "string" ? color : (entry.color ?? color);
		const words = text.split(" ");
		const wrapped = [];
		let current = "";
		for (const word of words) {
			const candidate = current ? `${current} ${word}` : word;
			if (current && measureCtx.measureText(candidate).width > maxTextWidthPx) {
				wrapped.push({ text: current, color: lineColor });
				current = word;
			} else {
				current = candidate;
			}
		}
		wrapped.push({ text: current, color: lineColor });
		return wrapped;
	}
	const wrappedLines = lines.flatMap(wrapLine);

	const canvas = document.createElement("canvas");
	canvas.width = CANVAS_WIDTH;
	canvas.height = Math.round(wrappedLines.length * lineHeightPx + paddingPx * 2);
	const ctx = canvas.getContext("2d");

	const strokeWidth = Math.max(1, fontSizePx * 0.05);
	ctx.fillStyle = background;
	ctx.strokeStyle = borderColor;
	ctx.lineWidth = strokeWidth;
	ctx.beginPath();
	ctx.rect(
		strokeWidth / 2,
		strokeWidth / 2,
		canvas.width - strokeWidth,
		canvas.height - strokeWidth
	);
	ctx.fill();
	ctx.stroke();

	ctx.font = `400 ${fontSizePx}px "Menlo", monospace`;
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	const cx = canvas.width / 2;
	for (let i = 0; i < wrappedLines.length; i++) {
		ctx.fillStyle = wrappedLines[i].color;
		ctx.fillText(wrappedLines[i].text, cx, paddingPx + lineHeightPx * (i + 0.5), maxTextWidthPx);
	}

	const height = width * (canvas.height / canvas.width);
	return wrapCanvasInPanel(canvas, width, height, depthBiasUnits, anisotropy);
}

// neon effect over a rasterized SVG. returns blank, since decoding is
// async; the texture fills in on load. canvas is padded by `glowPadding`
// so the glow doesn't clip. `color` = letterforms, `glowColor` = halo
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
	// sized so the shorter side never drops below MIN_DIMENSION. a fixed
	// width starves wide SVGs like the ~5:1 sign, whose thin neon stroke
	// pixelates first.
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

	// the dark letterform fill becomes the neon color; the light highlight
	// fill stays white and serves as the hot core.
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
		// blurred passes build the halo, then a crisp pass for the edge.
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
