# 各種ツール

`/bin`ディレクトリにはコンテンツ作成に関するコマンドが格納されています。

## コンテンツ作成関連

### createContent.mjs

`/src/contents`ディレクトリ下に`POST`（ブログ記事）または`PAGE`（固定ページ）の雛形を生成します。

タスクとして登録されており、以下のように実行できます。

```bash
task create -- [page|post]
```

### publishContent.mjs

`POST`（ブログ記事）または`PAGE`（固定ページ）を公開状態にします。併せて作成日時・更新日時も更新します（公開日時を起点とします）。

タスクとして登録されており、以下のように実行できます。
なお、`pash`は`[post|page]/filename`（拡張子不要）で指定してください。

```bash
task publish -- [path]
```

### updateContent.mjs

`POST`（ブログ記事）または`PAGE`（固定ページ）の更新日時を更新します。

タスクとして登録されており、以下のように実行できます。
なお、`pash`は`[post|page]/filename`（拡張子不要）で指定してください。

```bash
task update -- [path]
```

## 各種JSON作成関連

JSON関連のコマンドは以下のタスクで一括実行されます。

```bash
task json
```

### createPageJSON.mjs

`PAGE`（固定ページ）一覧のJSONを生成します。

### createPostJSON.mjs

`POST`（ブログ記事）一覧のJSONを生成します。

### createCategoryJSON.mjs

カテゴリー別の`POST`（ブログ記事）一覧のJSONを生成します。

### createTagJSON.mjs

タグ別の`POST`（ブログ記事）一覧のJSONを生成します。

## 修正履歴

### 2026-05-18

`Claude Code`にレビューをお願いして共通化を含めて修正してもらった。

#### 新規作成: `bin/sharedBin.mjs`

| エクスポート | 用途 |
| --- | --- |
| ROOT_DIR | プロジェクトルートパス（全ファイルで重複していた ESM __dirname 解決を一元化） |
| FRONT_MATTER_REGEX | フロントマター正規表現の定数化 |
| extractFrontMatter(filePath) | createPagesJSON / createPostsJSON の完全重複を解消 |
| updateFrontMatterField(text, key, value) | publishContent / updateContent の更新パターンを共通化 |
| readAndUpdateMarkdown(markdownPath, updateFn) | ファイル読み書き・バリデーションの共通化 |
| stringHash(str) | createCategoryJSON / createTagJSON の重複を解消、Sqids インスタンスをモジュール単位で1つだけ生成するよう修正 |
| createContentJSON(contentType) | createPagesJSON / createPostsJSON のほぼ同一ロジックを統合 |

#### 修正したバグ・問題

1. sqids が package.json 未登録 → dependencies に "sqids": "^0.3.0" を追加
2. extractFrontMatter の lines.indexOf(line) バグ → ループインデックス i を使うよう修正（重複行があると誤動作していた）
3. updateContent.mjs のデッドコード → コメントアウトされた__dirname・未使用の__filename/fileURLToPath をすべて除去
4. Sqids インスタンスの繰り返し生成 → モジュールレベルで1インスタンスのみ生成するよう修正
