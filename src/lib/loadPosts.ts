import posts from "@/data/posts.json";
import type { postInfo } from "@/lib/loadPost";

const loadPosts = (): postInfo[] => {
  return posts
    .filter((post) => post.status === "published")
    .map((post) => {
      return {
        id: post.id,
        title: post.title,
        content: "",
        created_at: post.created_at,
        updated_at: post.updated_at,
        category: post.category || "",
        tags: post.tags || [],
      };
    });
};

export default loadPosts;
