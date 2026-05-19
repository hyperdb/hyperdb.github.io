import * as fs from "node:fs";
import * as path from "node:path";
import { ROOT_DIR } from "./sharedBin.mjs";

/**
 * UNIX時間を62進数に変換する関数
 * 使用文字: 0-9, a-z, A-Z
 */
function toBase62(num) {
	const chars =
		"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	let result = "";
	let n = num;

	if (n === 0) return "0";

	while (n > 0) {
		result = chars[n % 62] + result;
		n = Math.floor(n / 62);
	}

	return result;
}

/**
 * 空のマークダウンファイルを作成する関数
 * @param {string} pageType - 'post' または 'page'
 */
function createContent(pageType) {
	// ページタイプの検証
	if (pageType !== "post" && pageType !== "page") {
		console.error(
			'エラー: ページタイプは "post" または "page" を指定してください。',
		);
		process.exit(1);
	}

	// 対象ディレクトリの決定
	const targetDir = path.join(ROOT_DIR, "src", "contents", `${pageType}s`);

	// ディレクトリが存在しない場合は作成
	if (!fs.existsSync(targetDir)) {
		fs.mkdirSync(targetDir, { recursive: true });
	}

	// UNIX時間を取得して62進数に変換
	const unixTime = Math.floor(Date.now() / 1000);
	const base62FileName = toBase62(unixTime);
	const fileName = `${base62FileName}.md`;
	const filePath = path.join(targetDir, fileName);

	// ファイルが既に存在する場合のチェック
	if (fs.existsSync(filePath)) {
		console.error(`エラー: ファイル ${fileName} は既に存在します。`);
		process.exit(1);
	}

	// フロントマターを含むマークダウンファイルを作成
	const currentDate = new Date().toISOString();
	const frontMatter = `---
title: 
tags: 
category: 
description: 
created_at: ${currentDate}
updated_at: ${currentDate}
content_type: ${pageType}
status: draft
---

`;

	fs.writeFileSync(filePath, frontMatter, "utf-8");

	console.log(`✓ ファイルを作成しました: ${filePath}`);
	console.log(`  ページタイプ: ${pageType}`);
	console.log(`  ファイル名: ${fileName}`);
	console.log(`  UNIX時間: ${unixTime}`);
}

function main() {
	// コマンドライン引数の取得 (node bin/createContent.mjs [pageType])
	const args = process.argv.slice(2);

	if (args.length === 0) {
		console.error("使用方法: node bin/createContent.mjs <post|page>");
		console.error("例: node bin/createContent.mjs post");
		process.exit(1);
	}

	const pageType = args[0];
	createContent(pageType);
}

main();
