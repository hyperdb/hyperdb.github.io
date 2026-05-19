import type { categoryInfo } from "@/lib/loadCategories";
import loadCategories from "@/lib/loadCategories";

const loadCategory = (id: string): categoryInfo | undefined => {
  const categories = loadCategories();
  return categories.find((category) => category.id === id);
};
export default loadCategory;
