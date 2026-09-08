import * as THREE from "three";

// the head panels' typeface. canvas text can't inherit css, so the stack
// is read off the same custom property the dom ui uses
let panelFontStack = null;
function panelFont(sizePx) {
	if (panelFontStack === null) {
		panelFontStack =
			(typeof window !== "undefined" &&
				getComputedStyle(document.documentElement)
					.getPropertyValue("--font-mono")
					.trim()) ||
			"Menlo, Consolas, Monaco, monospace";
	}
	return `400 ${sizePx}px ${panelFontStack}`;
}

// the dark end of the gradient is unreadable on a near-black panel, so any
// line colour below this lightness gets lifted, hue and saturation kept
const MIN_PANEL_TEXT_LIGHTNESS = 0.62;

// "#abc", "#aabbcc" or "rgb(r, g, b)" -> 0..1 components
function parseColorComponents(color) {
	if (typeof color !== "string") return null;
	const hex = color.trim().replace(/^#/, "");
	if (/^[0-9a-f]{3}$/i.test(hex)) {
		return [...hex].map((char) => parseInt(char + char, 16) / 255);
	}
	if (/^[0-9a-f]{6}$/i.test(hex)) {
		return [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
	}
	const rgb = color.match(/-?[\d.]+/g);
	return rgb && rgb.length >= 3 ? rgb.slice(0, 3).map((n) => Number(n) / 255) : null;
}

// raises a colour to the floor above, leaving anything already light alone
function readableOnDark(color) {
	const rgb = parseColorComponents(color);
	if (!rgb) return color;
	const [r, g, b] = rgb;
	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	const lightness = (max + min) / 2;
	if (lightness >= MIN_PANEL_TEXT_LIGHTNESS) return color;

	// hsl round trip, so only l moves
	const delta = max - min;
	const saturation =
		delta === 0
			? 0
			: delta / (1 - Math.abs(2 * lightness - 1) || Number.EPSILON);
	let hue = 0;
	if (delta !== 0) {
		if (max === r) hue = ((g - b) / delta) % 6;
		else if (max === g) hue = (b - r) / delta + 2;
		else hue = (r - g) / delta + 4;
		hue *= 60;
		if (hue < 0) hue += 360;
	}
	const l = MIN_PANEL_TEXT_LIGHTNESS;
	const c = (1 - Math.abs(2 * l - 1)) * Math.min(1, saturation);
	const x = c * (1 - Math.abs(((hue / 60) % 2) - 1));
	const m = l - c / 2;
	const sector = Math.floor(hue / 60) % 6;
	const [rr, gg, bb] = [
		[c, x, 0],
		[x, c, 0],
		[0, c, x],
		[0, x, c],
		[x, 0, c],
		[c, 0, x]
	][sector];
	const to255 = (v) => Math.round(Math.min(1, Math.max(0, v + m)) * 255);
	return `rgb(${to255(rr)}, ${to255(gg)}, ${to255(bb)})`;
}

// wraps a drawn canvas in a thin box
function wrapCanvasInPanel(
	canvas,
	width,
	height,
	depthBiasUnits = -4,
	anisotropy = 1,
	depthWrite = true
) {
	const texture = new THREE.CanvasTexture(canvas);
	// the canvas is srgb; without this the text renders washed out
	texture.colorSpace = THREE.SRGBColorSpace;
	// always minified, so anisotropy keeps the text from softening
	texture.anisotropy = anisotropy;
	const faceMaterial = new THREE.MeshBasicMaterial({
		map: texture,
		transparent: true,
		// frontside on both faces, so the mirrored back never wins
		depthTest: true,
		// a transparent quad writing depth would cut out whatever overlaps it
		depthWrite,
		// biases depth toward the camera, to win against its mount
		polygonOffset: true,
		polygonOffsetFactor: 0,
		polygonOffsetUnits: depthBiasUnits
	});
	// invisible, or the box's edges draw a bar around the art
	const edgeMaterial = new THREE.MeshBasicMaterial({
		transparent: true,
		opacity: 0,
		depthWrite: false
	});
	const depth = Math.min(width, height) * 0.05;
	const geometry = new THREE.BoxGeometry(width, height, depth);
	// face order is [+x, -x, +y, -y, +z, -z]: the canvas goes front and back
	const materials = [
		edgeMaterial,
		edgeMaterial,
		edgeMaterial,
		edgeMaterial,
		faceMaterial,
		faceMaterial
	];
	// or the box's rectangle gets outlined instead of the glyphs
	faceMaterial.userData.outlineParameters = { visible: false };
	edgeMaterial.userData.outlineParameters = { visible: false };
	const mesh = new THREE.Mesh(geometry, materials);
	mesh.renderOrder = 10;
	return { mesh, texture };
}

// draws text to a canvas and wraps it; `neon` adds a glowing-tube look
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
			// crisp outline: the glass edge
			ctx.save();
			ctx.strokeStyle = color;
			ctx.lineWidth = 4;
			ctx.shadowColor = color;
			ctx.shadowBlur = 10;
			ctx.strokeText(lineText, cx, cy, maxWidth);
			ctx.restore();

			// tight colour glow, kept small so it doesn't wash out
			ctx.save();
			ctx.fillStyle = color;
			ctx.shadowColor = color;
			ctx.shadowBlur = 4;
			ctx.fillText(lineText, cx, cy, maxWidth);
			ctx.restore();

			// sharp white core: the tube centre
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

// dark panel of wrapped text lines; returns the texture so callers can dispose it
export function makeLabelPanel(
	lines,
	{
		width,
		// tuned against the wrapped line length
		fontSizeFraction = 0.0465,
		color = "#ffffff",
		background = "rgba(0, 0, 0, 0.82)",
		borderColor = "rgba(255, 255, 255, 0.35)",
		depthBiasUnits,
		anisotropy = 1
	}
) {
	// reference resolution; raising it supersamples without changing layout
	const CANVAS_WIDTH = 1024;
	const fontSizePx = CANVAS_WIDTH * fontSizeFraction;
	const lineHeightPx = fontSizePx * 1.5;
	const paddingPx = fontSizePx * 0.6;
	const maxTextWidthPx = CANVAS_WIDTH - paddingPx * 2;

	// word-wraps a line against the real font metrics
	const measureCtx = document.createElement("canvas").getContext("2d");
	measureCtx.font = panelFont(fontSizePx);
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

	ctx.font = panelFont(fontSizePx);
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	const cx = canvas.width / 2;
	for (let i = 0; i < wrappedLines.length; i++) {
		ctx.fillStyle = readableOnDark(wrappedLines[i].color);
		ctx.fillText(wrappedLines[i].text, cx, paddingPx + lineHeightPx * (i + 0.5), maxTextWidthPx);
	}

	const height = width * (canvas.height / canvas.width);
	return wrapCanvasInPanel(canvas, width, height, depthBiasUnits, anisotropy);
}

// neon treatment over a rasterised svg; returns blank until it decodes
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
	// sized off the shorter side, so wide art keeps its stroke resolution
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
		depthBiasUnits,
		1,
		// these overlap each other's padding, so none may write depth
		false
	);

	// dark letterforms take the neon colour; white fills stay as the hot core
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
		// blurred passes build the halo, then a crisp pass for the edge
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
