import * as fs from "node:fs";
import * as path from "node:path";
import { ROOT_DIR, stringHash } from "./sharedBin.mjs";

function main() {
	const postsJSON = path.join(ROOT_DIR, "src", "data", "posts.json");
	const pagesJSON = path.join(ROOT_DIR, "src", "data", "pages.json");
	const categoriesJSON = path.join(ROOT_DIR, "src", "data", "categories.json");

	const post_json = JSON.parse(fs.readFileSync(postsJSON, "utf-8"));
	const page_json = JSON.parse(fs.readFileSync(pagesJSON, "utf-8"));

	const categories = {};

	for (const item of [...post_json, ...page_json]) {
		if (item.category) {
			const categoryHash = stringHash(item.category);
			if (!categories[categoryHash]) {
				categories[categoryHash] = {
					name: item.category,
					hash: categoryHash,
					count: 0,
					content_list: [],
				};
			}
			categories[categoryHash].count += 1;
			categories[categoryHash].content_list.push({
				title: item.title,
				id: item.id,
				content_type: item.content_type,
			});
		}
	}

	fs.writeFileSync(
		categoriesJSON,
		JSON.stringify(categories, null, 4),
		"utf-8",
	);
}

main();
