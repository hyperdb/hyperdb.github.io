#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// UNIX時間を62進数に変換する関数
function toBase62(num) {
	const chars =
		"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
	let result = "";

	do {
		result = chars[num % 62] + result;
		num = Math.floor(num / 62);
	} while (num > 0);

	return result;
}

// メイン処理
async function createPage() {
	try {
		// 現在のUNIX時間を62進数に変換
		const unixTime = Math.floor(Date.now() / 1000);
		const slug = `${toBase62(unixTime)}`;
		const filename = `${slug}.md`;

		// フロントマターとコンテンツを作成
		const content = `---
slug: ${slug}
title:
category:
tags: []
created_at:
updated_at:
status: draft
---

ここに本文を記述してください。
`;

		// 保存先ディレクトリ
		const postsDir = path.join(__dirname, "..", "src", "content", "pages");

		// ディレクトリが存在しない場合は作成
		if (!fs.existsSync(postsDir)) {
			fs.mkdirSync(postsDir, { recursive: true });
		}

		// ファイルを作成
		const filepath = path.join(postsDir, filename);
		fs.writeFileSync(filepath, content, "utf8");

		console.log(`\n✅ ページを作成しました: ${filename}`);
		console.log(`📁 パス: ${filepath}`);
	} catch (error) {
		console.error("エラーが発生しました:", error.message);
		process.exit(1);
	}
}

// 実行
createPage();
