import posts from "@/data/posts.json";

type postInfo = {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  category: string;
  tags: string[];
};

export type { postInfo };

const postContentFiles = import.meta.glob("../contents/posts/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const loadPost = (id: string): postInfo => {
  const post = posts.find((p) => p.id === id);

  // 投稿が見つからない場合や、公開されていない場合はエラーを投げる
  if (!post) {
    throw new Error(`Post with id ${id} not found`);
  }
  if (!post.status || post.status !== "published") {
    throw new Error(`Post with id ${id} is not published`);
  }

  // コンテンツをマークダウンファイルから読み込む
  let content = "";
  const contentPath = `../contents/posts/${post.id}.md`;
  const markdownContent = postContentFiles[contentPath];
  if (!markdownContent) {
    throw new Error(`Content file for post with id ${id} not found`);
  }
  content = markdownContent.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "");

  return {
    id: post.id,
    title: post.title,
    content: content,
    created_at: post.created_at,
    updated_at: post.updated_at,
    category: post.category || "",
    tags: post.tags || [],
  };
};
export default loadPost;
