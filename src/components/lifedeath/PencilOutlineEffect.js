import {
	BackSide,
	Color,
	ShaderMaterial,
	UniformsLib,
	UniformsUtils
} from "three";

// A fork of three.js's own OutlineEffect (examples/jsm/effects/OutlineEffect.js)
// — same inflated-backface-hull technique, same per-material
// userData.outlineParameters API (thickness/color/alpha/visible/keepAlive),
// same render()/renderOutline()/setSize() surface — with one addition: the
// extruded hull's vertices are perturbed by a hash of each vertex's own
// REST-POSE local position, so the line's thickness and direction wobble
// unevenly like a hand-drawn stroke instead of tracing a perfectly smooth
// vector silhouette.
//
// That noise is keyed to `position` (the raw, pre-skinning attribute) —
// not screen space, not even world space — so a given vertex always gets
// the exact same jitter every frame: identical from any camera angle,
// unaffected by the crowd's own walk-cycle animation, and never needing a
// second render pass to compute. (An earlier attempt at this same "pencil"
// look used a screen-space post-process instead, and its noise swam across
// people as the camera moved for exactly the reason this version doesn't.)
class PencilOutlineEffect {
	constructor(renderer, parameters = {}) {
		this.enabled = true;

		const defaultThickness =
			parameters.defaultThickness !== undefined
				? parameters.defaultThickness
				: 0.003;
		const defaultColor = new Color().fromArray(
			parameters.defaultColor !== undefined ? parameters.defaultColor : [0, 0, 0]
		);
		const defaultAlpha =
			parameters.defaultAlpha !== undefined ? parameters.defaultAlpha : 1.0;
		const defaultKeepAlive =
			parameters.defaultKeepAlive !== undefined
				? parameters.defaultKeepAlive
				: false;
		// How unevenly the stroke width varies vertex-to-vertex (0 = the
		// plain, uniform OutlineEffect line; 1 = thickness can swing all
		// the way down to 0 at its jitteriest vertices).
		const defaultThicknessJitter =
			parameters.defaultThicknessJitter !== undefined
				? parameters.defaultThicknessJitter
				: 0.9;
		// How far the extrusion direction itself wanders off the true
		// normal — this is what makes the line bow and waver rather than
		// just pulse thicker/thinner in place.
		const defaultNormalJitter =
			parameters.defaultNormalJitter !== undefined
				? parameters.defaultNormalJitter
				: 0.3;
		// How finely the jitter pattern repeats across a mesh's own local
		// coordinates. Tuned for the crowd's human-scale bodies (~2 world
		// units tall) — a mesh with only a handful of vertices (a plain
		// wall/floor plane) won't have enough of them for this to read as
		// a wobble regardless of frequency, which is fine since those
		// materials disable the outline entirely via outlineParameters.visible.
		const defaultNoiseFrequency =
			parameters.defaultNoiseFrequency !== undefined
				? parameters.defaultNoiseFrequency
				: 3.2;

		const cache = {};
		const removeThresholdCount = 60;
		const originalMaterials = {};
		const originalOnBeforeRenders = {};

		const uniformsOutline = {
			outlineThickness: { value: defaultThickness },
			outlineColor: { value: defaultColor },
			outlineAlpha: { value: defaultAlpha },
			outlineThicknessJitter: { value: defaultThicknessJitter },
			outlineNormalJitter: { value: defaultNormalJitter },
			outlineNoiseFrequency: { value: defaultNoiseFrequency }
		};

		const vertexShader = [
			"#include <common>",
			"#include <uv_pars_vertex>",
			"#include <displacementmap_pars_vertex>",
			"#include <fog_pars_vertex>",
			"#include <morphtarget_pars_vertex>",
			"#include <skinning_pars_vertex>",
			"#include <logdepthbuf_pars_vertex>",
			"#include <clipping_planes_pars_vertex>",

			"uniform float outlineThickness;",
			"uniform float outlineThicknessJitter;",
			"uniform float outlineNormalJitter;",
			"uniform float outlineNoiseFrequency;",

			// A raw hash (used only as value-noise's per-cell corner
			// value, below) has no spatial coherence at all — neighboring
			// inputs give totally unrelated outputs. Using that directly
			// per vertex is what made the first attempt at this read as
			// messy static rather than a hand-drawn line: every vertex
			// jittered independently, with no relation to its neighbors.
			"float pencilHash( vec3 p ) {",
			"	p = fract( p * 0.3183099 + vec3( 0.1, 0.2, 0.3 ) );",
			"	p *= 17.0;",
			"	return fract( p.x * p.y * p.z * ( p.x + p.y + p.z ) );",
			"}",

			// Trilinearly-interpolated (and smoothstepped) value noise —
			// unlike the raw hash above, this varies continuously, so
			// vertices that are close together in local space get similar
			// values. That continuity is what a hand-drawn line actually
			// needs: a slow, coherent bow along its length rather than
			// per-point static.
			"float pencilValueNoise( vec3 p ) {",
			"	vec3 i = floor( p );",
			"	vec3 f = fract( p );",
			"	vec3 u = f * f * ( 3.0 - 2.0 * f );",
			"	return mix(",
			"		mix(",
			"			mix( pencilHash( i + vec3( 0.0, 0.0, 0.0 ) ), pencilHash( i + vec3( 1.0, 0.0, 0.0 ) ), u.x ),",
			"			mix( pencilHash( i + vec3( 0.0, 1.0, 0.0 ) ), pencilHash( i + vec3( 1.0, 1.0, 0.0 ) ), u.x ),",
			"			u.y ),",
			"		mix(",
			"			mix( pencilHash( i + vec3( 0.0, 0.0, 1.0 ) ), pencilHash( i + vec3( 1.0, 0.0, 1.0 ) ), u.x ),",
			"			mix( pencilHash( i + vec3( 0.0, 1.0, 1.0 ) ), pencilHash( i + vec3( 1.0, 1.0, 1.0 ) ), u.x ),",
			"			u.y ),",
			"		u.z );",
			"}",

			// Two octaves — one broad, dominant wave a vertex's neighbors
			// mostly share (the actual hand-drawn "bow" in the line), plus
			// a much smaller, finer ripple on top (a little roughness, not
			// the main shape) — rather than one single-frequency noise,
			// which either bows smoothly with no texture or gets textured
			// but loses the bow, never both at once.
			"vec3 pencilSketchJitter( vec3 p ) {",
			"	vec3 coarse = vec3(",
			"		pencilValueNoise( p ),",
			"		pencilValueNoise( p + vec3( 19.1, 5.3, 8.7 ) ),",
			"		pencilValueNoise( p + vec3( 3.4, 27.6, 14.2 ) )",
			"	);",
			"	vec3 fine = vec3(",
			"		pencilValueNoise( p * 3.0 + vec3( 91.3, 12.9, 4.1 ) ),",
			"		pencilValueNoise( p * 3.0 + vec3( 6.7, 55.2, 19.8 ) ),",
			"		pencilValueNoise( p * 3.0 + vec3( 40.5, 2.2, 71.4 ) )",
			"	);",
			"	return ( coarse - 0.5 ) * 2.0 + ( fine - 0.5 ) * 2.0 * 0.25;",
			"}",

			"vec4 calculateOutline( vec4 pos, vec3 normal, vec4 skinned ) {",
			"	vec3 jitter = pencilSketchJitter( position.xyz * outlineNoiseFrequency );",
			"	float thickness = outlineThickness * max( 0.0, 1.0 + jitter.x * outlineThicknessJitter );",
			"	const float ratio = 1.0;",
			"	vec3 wobbledNormal = normalize( normal + jitter * outlineNormalJitter );",
			"	vec4 pos2 = projectionMatrix * modelViewMatrix * vec4( skinned.xyz + wobbledNormal, 1.0 );",
			// NOTE: subtract pos2 from pos because BackSide objectNormal is negative
			"	vec4 norm = normalize( pos - pos2 );",
			"	return pos + norm * thickness * pos.w * ratio;",
			"}",

			"void main() {",

			"	#include <uv_vertex>",

			"	#include <beginnormal_vertex>",
			"	#include <morphnormal_vertex>",
			"	#include <skinbase_vertex>",
			"	#include <skinnormal_vertex>",

			"	#include <begin_vertex>",
			"	#include <morphtarget_vertex>",
			"	#include <skinning_vertex>",
			"	#include <displacementmap_vertex>",
			"	#include <project_vertex>",

			"	vec3 outlineNormal = - objectNormal;", // the outline material is always rendered with BackSide

			"	gl_Position = calculateOutline( gl_Position, outlineNormal, vec4( transformed, 1.0 ) );",

			"	#include <logdepthbuf_vertex>",
			"	#include <clipping_planes_vertex>",
			"	#include <fog_vertex>",

			"}"
		].join("\n");

		const fragmentShader = [
			"#include <common>",
			"#include <fog_pars_fragment>",
			"#include <logdepthbuf_pars_fragment>",
			"#include <clipping_planes_pars_fragment>",

			"uniform vec3 outlineColor;",
			"uniform float outlineAlpha;",

			"void main() {",

			"	#include <clipping_planes_fragment>",
			"	#include <logdepthbuf_fragment>",

			"	gl_FragColor = vec4( outlineColor, outlineAlpha );",

			"	#include <tonemapping_fragment>",
			"	#include <colorspace_fragment>",
			"	#include <fog_fragment>",
			"	#include <premultiplied_alpha_fragment>",

			"}"
		].join("\n");

		function createMaterial() {
			return new ShaderMaterial({
				type: "PencilOutlineEffect",
				uniforms: UniformsUtils.merge([
					UniformsLib["fog"],
					UniformsLib["displacementmap"],
					uniformsOutline
				]),
				vertexShader: vertexShader,
				fragmentShader: fragmentShader,
				side: BackSide
			});
		}

		function getOutlineMaterialFromCache(originalMaterial) {
			let data = cache[originalMaterial.uuid];

			if (data === undefined) {
				data = {
					material: createMaterial(),
					used: true,
					keepAlive: defaultKeepAlive,
					count: 0
				};

				cache[originalMaterial.uuid] = data;
			}

			data.used = true;

			return data.material;
		}

		function getOutlineMaterial(originalMaterial) {
			const outlineMaterial = getOutlineMaterialFromCache(originalMaterial);

			originalMaterials[outlineMaterial.uuid] = originalMaterial;

			updateOutlineMaterial(outlineMaterial, originalMaterial);

			return outlineMaterial;
		}

		function isCompatible(object) {
			const geometry = object.geometry;
			const hasNormals =
				geometry !== undefined && geometry.attributes.normal !== undefined;

			return (
				object.isMesh === true &&
				object.material !== undefined &&
				hasNormals === true
			);
		}

		function setOutlineMaterial(object) {
			if (isCompatible(object) === false) return;

			if (Array.isArray(object.material)) {
				for (let i = 0, il = object.material.length; i < il; i++) {
					object.material[i] = getOutlineMaterial(object.material[i]);
				}
			} else {
				object.material = getOutlineMaterial(object.material);
			}

			originalOnBeforeRenders[object.uuid] = object.onBeforeRender;
			object.onBeforeRender = onBeforeRender;
		}

		function restoreOriginalMaterial(object) {
			if (isCompatible(object) === false) return;

			if (Array.isArray(object.material)) {
				for (let i = 0, il = object.material.length; i < il; i++) {
					object.material[i] = originalMaterials[object.material[i].uuid];
				}
			} else {
				object.material = originalMaterials[object.material.uuid];
			}

			object.onBeforeRender = originalOnBeforeRenders[object.uuid];
		}

		function onBeforeRender(renderer, scene, camera, geometry, material) {
			const originalMaterial = originalMaterials[material.uuid];

			if (originalMaterial === undefined) return;

			updateUniforms(material, originalMaterial);
		}

		function updateUniforms(material, originalMaterial) {
			const outlineParameters = originalMaterial.userData.outlineParameters;

			material.uniforms.outlineAlpha.value = originalMaterial.opacity;

			if (outlineParameters !== undefined) {
				if (outlineParameters.thickness !== undefined)
					material.uniforms.outlineThickness.value = outlineParameters.thickness;
				if (outlineParameters.color !== undefined)
					material.uniforms.outlineColor.value.fromArray(outlineParameters.color);
				if (outlineParameters.alpha !== undefined)
					material.uniforms.outlineAlpha.value = outlineParameters.alpha;
				if (outlineParameters.thicknessJitter !== undefined)
					material.uniforms.outlineThicknessJitter.value =
						outlineParameters.thicknessJitter;
				if (outlineParameters.normalJitter !== undefined)
					material.uniforms.outlineNormalJitter.value =
						outlineParameters.normalJitter;
				if (outlineParameters.noiseFrequency !== undefined)
					material.uniforms.outlineNoiseFrequency.value =
						outlineParameters.noiseFrequency;
			}

			if (originalMaterial.displacementMap) {
				material.uniforms.displacementMap.value = originalMaterial.displacementMap;
				material.uniforms.displacementScale.value =
					originalMaterial.displacementScale;
				material.uniforms.displacementBias.value = originalMaterial.displacementBias;
			}
		}

		function updateOutlineMaterial(material, originalMaterial) {
			if (material.name === "invisible") return;

			const outlineParameters = originalMaterial.userData.outlineParameters;

			material.fog = originalMaterial.fog;
			material.toneMapped = originalMaterial.toneMapped;
			material.premultipliedAlpha = originalMaterial.premultipliedAlpha;
			material.displacementMap = originalMaterial.displacementMap;

			if (outlineParameters !== undefined) {
				if (originalMaterial.visible === false) {
					material.visible = false;
				} else {
					material.visible =
						outlineParameters.visible !== undefined
							? outlineParameters.visible
							: true;
				}

				material.transparent =
					outlineParameters.alpha !== undefined && outlineParameters.alpha < 1.0
						? true
						: originalMaterial.transparent;

				if (outlineParameters.keepAlive !== undefined)
					cache[originalMaterial.uuid].keepAlive = outlineParameters.keepAlive;
			} else {
				material.transparent = originalMaterial.transparent;
				material.visible = originalMaterial.visible;
			}

			if (originalMaterial.wireframe === true || originalMaterial.depthTest === false)
				material.visible = false;

			if (originalMaterial.clippingPlanes) {
				material.clipping = true;

				material.clippingPlanes = originalMaterial.clippingPlanes;
				material.clipIntersection = originalMaterial.clipIntersection;
				material.clipShadows = originalMaterial.clipShadows;
			}

			material.version = originalMaterial.version;
		}

		function cleanupCache() {
			let keys;

			keys = Object.keys(originalMaterials);

			for (let i = 0, il = keys.length; i < il; i++) {
				originalMaterials[keys[i]] = undefined;
			}

			keys = Object.keys(originalOnBeforeRenders);

			for (let i = 0, il = keys.length; i < il; i++) {
				originalOnBeforeRenders[keys[i]] = undefined;
			}

			keys = Object.keys(cache);

			for (let i = 0, il = keys.length; i < il; i++) {
				const key = keys[i];

				if (cache[key].used === false) {
					cache[key].count++;

					if (cache[key].keepAlive === false && cache[key].count > removeThresholdCount) {
						delete cache[key];
					}
				} else {
					cache[key].used = false;
					cache[key].count = 0;
				}
			}
		}

		this.render = function (scene, camera) {
			if (this.enabled === false) {
				renderer.render(scene, camera);
				return;
			}

			const currentAutoClear = renderer.autoClear;
			renderer.autoClear = this.autoClear;

			renderer.render(scene, camera);

			renderer.autoClear = currentAutoClear;

			this.renderOutline(scene, camera);
		};

		this.renderOutline = function (scene, camera) {
			const currentAutoClear = renderer.autoClear;
			const currentSceneAutoUpdate = scene.matrixWorldAutoUpdate;
			const currentSceneBackground = scene.background;
			const currentShadowMapEnabled = renderer.shadowMap.enabled;

			scene.matrixWorldAutoUpdate = false;
			scene.background = null;
			renderer.autoClear = false;
			renderer.shadowMap.enabled = false;

			scene.traverse(setOutlineMaterial);

			renderer.render(scene, camera);

			scene.traverse(restoreOriginalMaterial);

			cleanupCache();

			scene.matrixWorldAutoUpdate = currentSceneAutoUpdate;
			scene.background = currentSceneBackground;
			renderer.autoClear = currentAutoClear;
			renderer.shadowMap.enabled = currentShadowMapEnabled;
		};

		this.setSize = function (width, height, updateStyle) {
			renderer.setSize(width, height, updateStyle);
		};
	}
}

export { PencilOutlineEffect };
