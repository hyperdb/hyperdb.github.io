import pages from "@/data/pages.json";

type pageInfo = {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  category: string;
  tags: string[];
};

export type { pageInfo };

const pageContentFiles = import.meta.glob("../contents/pages/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const loadPage = (id: string): pageInfo => {
  const page = pages.find((p) => p.id === id);

  // ページが見つからない場合や、公開されていない場合はエラーを投げる
  if (!page) {
    throw new Error(`Page with id ${id} not found`);
  }
  if (!page.status || page.status !== "published") {
    throw new Error(`Page with id ${id} is not published`);
  }

  // コンテンツをマークダウンファイルから読み込む
  let content = "";
  const contentPath = `../contents/pages/${page.id}.md`;
  const markdownContent = pageContentFiles[contentPath];
  if (!markdownContent) {
    throw new Error(`Content file for page with id ${id} not found`);
  }
  content = markdownContent.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "");

  return {
    id: page.id,
    title: page.title,
    content: content,
    created_at: page.created_at,
    updated_at: page.updated_at,
    category: page.category || "",
    tags: page.tags || [],
  };
};
export default loadPage;
