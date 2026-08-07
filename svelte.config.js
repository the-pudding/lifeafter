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
		// This app is never actually served from a domain root — GitHub
		// Pages publishes it as a project page at /lifedeath/, and the
		// eventual pudding.cool deploy (see the Makefile's own PUDDING_PATH)
		// will be some other /year/month/name subpath — so a single
		// hardcoded base (or one keyed off NODE_ENV, which is
		// "production" for *both* targets since both just run
		// `vite build`) can't be right for more than one of them at once.
		// BASE_PATH is set per-target by the Makefile (empty/unset for
		// `npm run dev`, which is what keeps local dev at the real root).
		paths: {
			base: process.env.BASE_PATH || ""
		}
	}
};

export default config;
