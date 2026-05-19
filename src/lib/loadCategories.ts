import categories from "@/data/categories.json";
import type { linkItem } from "@/lib/loadTags";

type categoryInfo = {
  id: string;
  name: string;
  hash: string;
  count: number;
  content_list: linkItem[];
};

export type { categoryInfo };

const loadCategories = (): categoryInfo[] => {
  return Object.values(categories).map((category: categoryInfo | any) => {
    return {
      id: category.hash,
      name: category.name,
      hash: category.hash,
      count: category.count,
      content_list: category.content_list.map((item: linkItem) => {
        return {
          id: item.id,
          title: item.title,
          content_type: item.content_type,
        };
      }),
    };
  });
};
export default loadCategories;
