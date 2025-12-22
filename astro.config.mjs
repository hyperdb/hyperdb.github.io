// @ts-check
import { defineConfig } from "astro/config";
import tsconfigPaths from "vite-tsconfig-paths";

// https://astro.build/config
export default defineConfig({
	output: "static",
	vite: {
		plugins: [tsconfigPaths()],
	},
	site: "https://hyperdb.github.io",
});
