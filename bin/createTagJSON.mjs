import * as fs from "node:fs";
import * as path from "node:path";
import { ROOT_DIR, stringHash } from "./sharedBin.mjs";

function main() {
	const postsJSON = path.join(ROOT_DIR, "src", "data", "posts.json");
	const pagesJSON = path.join(ROOT_DIR, "src", "data", "pages.json");
	const tagsJSON = path.join(ROOT_DIR, "src", "data", "tags.json");

	const post_json = JSON.parse(fs.readFileSync(postsJSON, "utf-8"));
	const page_json = JSON.parse(fs.readFileSync(pagesJSON, "utf-8"));

	const tags = {};

	for (const item of [...post_json, ...page_json]) {
		if (item.tags.length > 0) {
			for (const tag of item.tags) {
				const tagHash = stringHash(tag);
				if (!tags[tagHash]) {
					tags[tagHash] = {
						name: tag,
						hash: tagHash,
						count: 0,
						content_list: [],
					};
				}
				tags[tagHash].count += 1;
				tags[tagHash].content_list.push({
					title: item.title,
					id: item.id,
					content_type: item.content_type,
				});
			}
		}
	}

	fs.writeFileSync(tagsJSON, JSON.stringify(tags, null, 4), "utf-8");
}

main();
