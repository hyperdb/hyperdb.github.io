import type { tagInfo } from "@/lib/loadTags";
import loadTags from "@/lib/loadTags";

const loadTag = (id: string): tagInfo | undefined => {
  const tags = loadTags();
  return tags.find((tag) => tag.id === id);
};
export default loadTag;
