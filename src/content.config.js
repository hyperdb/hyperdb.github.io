import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const posts = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
	schema: z.object({
		slug: z.string(),
		title: z.string(),
		created_at: z.string(),
		updated_at: z.string(),
		category: z.string().optional().nullable(),
		tags: z.array(z.string()).optional(),
		status: z.enum(["draft", "publish"]).default("draft"),
	}),
});

const pages = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/pages" }),
	schema: z.object({
		slug: z.string(),
		title: z.string(),
		created_at: z.string(),
		updated_at: z.string(),
		category: z.string().optional().nullable(),
		tags: z.array(z.string()).optional(),
		status: z.enum(["draft", "publish"]).default("draft"),
	}),
});

export const collections = { posts, pages };
