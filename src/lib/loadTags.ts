import tags from "@/data/tags.json";

type linkItem = {
  id: string;
  title: string;
  content_type: "post" | "page";
};

export type { linkItem };

type tagInfo = {
  id: string;
  name: string;
  hash: string;
  count: number;
  content_list: linkItem[];
};

export type { tagInfo };

const loadTags = (): tagInfo[] => {
  return Object.values(tags).map((tag: tagInfo | any) => {
    return {
      id: tag.hash,
      name: tag.name,
      hash: tag.hash,
      count: tag.count,
      content_list: tag.content_list.map((item: linkItem) => {
        return {
          id: item.id,
          title: item.title,
          content_type: item.content_type,
        };
      }),
    };
  });
};
export default loadTags;
