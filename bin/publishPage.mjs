#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ISO 8601形式の日時文字列を生成（+09:00タイムゾーン付き）
function getISODateTimeWithTimezone() {
	const now = new Date();
	// JSTに変換（UTC+9時間）
	const jstOffset = 9 * 60; // 分単位
	const jstTime = new Date(now.getTime() + jstOffset * 60 * 1000);

	const year = jstTime.getUTCFullYear();
	const month = String(jstTime.getUTCMonth() + 1).padStart(2, "0");
	const day = String(jstTime.getUTCDate()).padStart(2, "0");
	const hours = String(jstTime.getUTCHours()).padStart(2, "0");
	const minutes = String(jstTime.getUTCMinutes()).padStart(2, "0");
	const seconds = String(jstTime.getUTCSeconds()).padStart(2, "0");

	return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}+09:00`;
}

// フロントマターを解析する関数
function parseFrontmatter(content) {
	const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
	const match = content.match(frontmatterRegex);

	if (!match) {
		throw new Error("フロントマターが見つかりません");
	}

	const frontmatterText = match[1];
	const frontmatter = {};

	// フロントマターの各行を解析
	const lines = frontmatterText.split("\n");
	for (const line of lines) {
		const colonIndex = line.indexOf(":");
		if (colonIndex === -1) continue;

		const key = line.substring(0, colonIndex).trim();
		const value = line.substring(colonIndex + 1).trim();

		// 値を適切に処理
		if (value.startsWith("[") && value.endsWith("]")) {
			// 配列の場合
			frontmatter[key] = value;
		} else if (value.startsWith('"') && value.endsWith('"')) {
			// 文字列の場合（引用符を保持）
			frontmatter[key] = value;
		} else {
			// その他の場合
			frontmatter[key] = value || "";
		}
	}

	return { frontmatter, originalText: match[0], fullContent: content };
}

// フロントマターを更新してファイルに書き込む
function updateFrontmatter(filepath, frontmatter, originalText, fullContent) {
	const now = getISODateTimeWithTimezone();

	// 新しいフロントマターを構築
	const newFrontmatter = { ...frontmatter };

	// statusがpublishでない場合はcreated_atも更新
	if (newFrontmatter.status !== '"publish"') {
		newFrontmatter.created_at = `"${now}"`;
	}

	// updated_atは常に更新
	newFrontmatter.updated_at = `"${now}"`;

	// statusをpublishに設定
	newFrontmatter.status = '"publish"';

	// フロントマターのテキストを再構築
	const frontmatterLines = [
		`slug: ${newFrontmatter.slug}`,
		`title: ${newFrontmatter.title}`,
		`category: ${newFrontmatter.category}`,
		`tags: ${newFrontmatter.tags}`,
		`created_at: ${newFrontmatter.created_at}`,
		`updated_at: ${newFrontmatter.updated_at}`,
		`status: ${newFrontmatter.status}`,
	];

	const newFrontmatterText = `---\n${frontmatterLines.join("\n")}\n---`;

	// 元のコンテンツのフロントマター部分を新しいものに置き換え
	const newContent = fullContent.replace(originalText, newFrontmatterText);

	// ファイルに書き込み
	fs.writeFileSync(filepath, newContent, "utf8");
}

// メイン処理
async function publishPost() {
	try {
		// 引数からslugを取得
		const slug = process.argv[2];

		if (!slug) {
			console.error("❌ エラー: slugを引数として指定してください");
			console.log("使用例: node bin/publishPost.mjs 1vXa8a");
			process.exit(1);
		}

		// ファイルパスを構築
		const pagesDir = path.join(__dirname, "..", "src", "content", "pages");
		const filename = `${slug}.md`;
		const filepath = path.join(pagesDir, filename);

		// ファイルが存在するか確認
		if (!fs.existsSync(filepath)) {
			console.error(`❌ エラー: ファイルが見つかりません: ${filename}`);
			process.exit(1);
		}

		// ファイルを読み込み
		const content = fs.readFileSync(filepath, "utf8");

		// フロントマターを解析
		const { frontmatter, originalText, fullContent } =
			parseFrontmatter(content);

		// 元のstatusを確認
		const wasPublished = frontmatter.status === '"publish"';

		// フロントマターを更新
		updateFrontmatter(filepath, frontmatter, originalText, fullContent);

		// 結果を表示
		console.log(`\n✅ 投稿を公開しました: ${filename}`);
		console.log(`📁 パス: ${filepath}`);
		if (wasPublished) {
			console.log("📝 更新日時のみを更新しました");
		} else {
			console.log("📝 作成日時と更新日時を更新しました");
		}
	} catch (error) {
		console.error("❌ エラーが発生しました:", error.message);
		process.exit(1);
	}
}

// 実行
publishPost();
