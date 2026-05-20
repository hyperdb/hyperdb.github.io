import { Heading, Link, List, Tag } from "@chakra-ui/react";
import { FaLink } from "react-icons/fa";
import DefaultLayout from "@/layouts/DefaultLayout";
import type { categoryInfo } from "@/lib/loadCategories";
import loadCategory from "@/lib/loadCategory";

interface Props {
	category_id: string;
}

const BlogCategories = (props: Props) => {
	const category: categoryInfo | undefined = loadCategory(props.category_id);

	if (!category) {
		return null;
	}

	const title = `カテゴリー別記事一覧: ${category.name}`;

	return (
		<DefaultLayout pageTitle={title}>
			<Heading as="h1" size="xl" mb={4}>
				🔖カテゴリー別記事一覧:
				<Tag.Root size={"xl"} mx={4} bg={"bg.emphasized"}>
					<Tag.Label>{category.name}</Tag.Label>
				</Tag.Root>
			</Heading>

			<List.Root gap="2" px={4} variant={"plain"}>
				{category.content_list.map((item) => (
					<List.Item key={item.id}>
						<List.Indicator asChild>
							<FaLink />
						</List.Indicator>
						<Link href={`/blog/${item.id}`}>{item.title}</Link>
					</List.Item>
				))}
			</List.Root>
		</DefaultLayout>
	);
};
export default BlogCategories;
