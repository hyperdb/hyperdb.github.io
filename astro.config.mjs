// @ts-check
import { defineConfig } from "astro/config";
import icon from "astro-icon";
import rehypeMermaid from "rehype-mermaid";
import tsconfigPaths from "vite-tsconfig-paths";

// https://astro.build/config
export default defineConfig({
	output: "static",

	vite: {
		plugins: [tsconfigPaths()],
	},

	site: "https://hyperdb.github.io",
	integrations: [icon()],
	markdown: {
		syntaxHighlight: {
			type: "shiki",
			excludeLangs: ["mermaid"],
		},
		shikiConfig: {
			themes: {
				light: "github-light",
				dark: "github-dark",
			},
		},
		rehypePlugins: [rehypeMermaid],
	},
});
