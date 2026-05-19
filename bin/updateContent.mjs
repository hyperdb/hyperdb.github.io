import { readAndUpdateMarkdown, updateFrontMatterField } from "./sharedBin.mjs";

function updateContent(markdownPath) {
	const currentDate = new Date().toISOString();

	readAndUpdateMarkdown(markdownPath, (frontMatter) =>
		updateFrontMatterField(frontMatter, "updated_at", currentDate),
	);

	console.log(`✓ ファイルを更新しました: ${markdownPath}`);
	console.log(`  updated_at: ${currentDate}`);
}

function main() {
	const args = process.argv.slice(2);

	if (args.length === 0) {
		console.error("使用方法: node bin/updateContent.mjs <markdown path>");
		console.error(
			"例: node bin/updateContent.mjs src/contents/posts/example.md",
		);
		process.exit(1);
	}

	updateContent(args[0]);
}

main();
