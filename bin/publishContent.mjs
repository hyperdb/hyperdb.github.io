import { readAndUpdateMarkdown, updateFrontMatterField } from "./sharedBin.mjs";

function publishContent(markdownPath) {
	const currentDate = new Date().toISOString();

	readAndUpdateMarkdown(markdownPath, (frontMatter) => {
		let updated = updateFrontMatterField(frontMatter, "created_at", currentDate);
		updated = updateFrontMatterField(updated, "updated_at", currentDate);
		updated = updateFrontMatterField(updated, "status", "published");
		return updated;
	});

	console.log(`✓ ファイルを更新しました: ${markdownPath}`);
	console.log(`  created_at: ${currentDate}`);
	console.log(`  updated_at: ${currentDate}`);
}

function main() {
	const args = process.argv.slice(2);

	if (args.length === 0) {
		console.error("使用方法: node bin/publishContent.mjs <markdown path>");
		console.error(
			"例: node bin/publishContent.mjs src/contents/posts/example.md",
		);
		process.exit(1);
	}

	publishContent(args[0]);
}

main();
