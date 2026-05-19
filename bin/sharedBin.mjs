import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import Sqids from "sqids";

export const ROOT_DIR = path.join(
	path.dirname(fileURLToPath(import.meta.url)),
	"..",
);

export const FRONT_MATTER_REGEX = /^---\r?\n([\s\S]*?)\r?\n---/;

/**
 * マークダウンファイルからフロントマターを抽出する
 */
export function extractFrontMatter(filePath) {
	try {
		const content = fs.readFileSync(filePath, "utf-8");
		const match = content.match(FRONT_MATTER_REGEX);

		if (!match) {
			console.warn(`警告: ${filePath} にフロントマターが見つかりません`);
			return null;
		}

		const frontMatter = {};
		const lines = match[1].split(/\r?\n/);
		let currentKey = null;

		for (let i = 0; i < lines.length; i++) {
			const line = lines[i];

			const arrayMatch = line.match(/^\s+- (.+)$/);
			if (arrayMatch) {
				if (currentKey && Array.isArray(frontMatter[currentKey])) {
					frontMatter[currentKey].push(arrayMatch[1].trim());
				}
				continue;
			}

			const keyValueMatch = line.match(/^([^:]+):\s*(.*)$/);
			if (keyValueMatch) {
				const key = keyValueMatch[1].trim();
				const value = keyValueMatch[2].trim();
				currentKey = key;

				if (value === "") {
					frontMatter[key] =
						i + 1 < lines.length && lines[i + 1].match(/^\s+- /)
							? []
							: "";
				} else {
					frontMatter[key] = value;
				}
			}
		}

		frontMatter.id = path.basename(filePath, ".md");

		if (frontMatter.tags === "") {
			frontMatter.tags = [];
		}

		return frontMatter;
	} catch (error) {
		console.error(`エラー: ${filePath} の読み込みに失敗しました:`, error);
		return null;
	}
}

/**
 * フロントマターテキスト内の1フィールドを更新する。
 * フィールドが存在しない場合は末尾に追加する。
 */
export function updateFrontMatterField(text, key, value) {
	const regex = new RegExp(`^${key}:\\s*.*$`, "m");
	if (regex.test(text)) {
		return text.replace(regex, `${key}: ${value}`);
	}
	return `${text}\n${key}: ${value}`;
}

/**
 * マークダウンファイルを読み込み、フロントマターを更新して書き戻す。
 * updateFn はフロントマター本文を受け取り、更新後の本文を返す関数。
 */
export function readAndUpdateMarkdown(markdownPath, updateFn) {
	if (!fs.existsSync(markdownPath)) {
		console.error(`エラー: ファイル ${markdownPath} が見つかりません。`);
		process.exit(1);
	}

	if (path.extname(markdownPath) !== ".md") {
		console.error("エラー: マークダウンファイル (.md) を指定してください。");
		process.exit(1);
	}

	const content = fs.readFileSync(markdownPath, "utf-8");
	const match = content.match(FRONT_MATTER_REGEX);

	if (!match) {
		console.error(
			"エラー: フロントマターが見つかりません。ファイルの先頭に --- で囲まれたフロントマターが必要です。",
		);
		process.exit(1);
	}

	const updatedFrontMatter = updateFn(match[1]);
	const newContent = content.replace(
		FRONT_MATTER_REGEX,
		`---\n${updatedFrontMatter}\n---`,
	);
	fs.writeFileSync(markdownPath, newContent, "utf-8");
}

const sqids = new Sqids();

/**
 * 文字列を Sqids でハッシュ化して URL-safe な ID を返す
 */
export function stringHash(str) {
	const codePoints = [];
	for (const char of str) {
		const codePoint = char.codePointAt(0);
		if (codePoint !== undefined) {
			codePoints.push(codePoint);
		}
	}
	if (codePoints.length === 0) return "";
	return sqids.encode(codePoints);
}

/**
 * コンテンツディレクトリを走査して JSON ファイルを生成する。
 * contentType は "post" または "page"。
 */
export function createContentJSON(contentType) {
	const contentDir = path.join(ROOT_DIR, "src", "contents", `${contentType}s`);
	const outputPath = path.join(ROOT_DIR, "src", "data", `${contentType}s.json`);

	if (!fs.existsSync(contentDir)) {
		console.error(`エラー: ${contentDir} が見つかりません。`);
		process.exit(1);
	}

	const files = fs
		.readdirSync(contentDir)
		.filter((f) => f.endsWith(".md"));

	if (files.length === 0) {
		console.warn("警告: マークダウンファイルが見つかりません。");
	}

	const items = files
		.map((file) => extractFrontMatter(path.join(contentDir, file)))
		.filter(Boolean);

	const dataDir = path.dirname(outputPath);
	if (!fs.existsSync(dataDir)) {
		fs.mkdirSync(dataDir, { recursive: true });
	}

	fs.writeFileSync(outputPath, JSON.stringify(items, null, 4), "utf-8");

	console.log(`✓ ${contentType}s.json を作成しました: ${outputPath}`);
	console.log(`  処理ファイル数: ${files.length}`);
	console.log(`  有効なコンテンツ数: ${items.length}`);
}
