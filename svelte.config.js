import adapterStatic from "@sveltejs/adapter-static";
import { sveltePreprocess } from "svelte-preprocess";
import autoprefixer from "autoprefixer";

const preprocess = sveltePreprocess({
	postcss: {
		plugins: [autoprefixer]
	}
});

const config = {
	compilerOptions: {
		runes: true
	},
	preprocess,
	kit: {
		adapter: adapterStatic({ strict: false }),
		// GitHub Pages serves this repo as a project page at
		// /lifedeath/, not the domain root — every asset/fetch URL needs
		// that prefix or it 404s against the bare domain instead (this is
		// what was breaking the crowd body GLBs and people.json in
		// production). `vite build` sets NODE_ENV to "production"
		// automatically (Vite's own default, not something this repo sets
		// itself); `vite dev` leaves it as "development", so local dev
		// keeps running at the actual root.
		paths: {
			base: process.env.NODE_ENV === "production" ? "/lifedeath" : ""
		}
	}
};

export default config;
