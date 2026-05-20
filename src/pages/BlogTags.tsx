import { Heading, Link, List, Tag } from "@chakra-ui/react";
import { FaLink } from "react-icons/fa";
import DefaultLayout from "@/layouts/DefaultLayout";
import loadTag from "@/lib/loadTag";
import type { tagInfo } from "@/lib/loadTags";

interface Props {
	tag_id: string;
}

const BlogTags = (props: Props) => {
	const tag: tagInfo | undefined = loadTag(props.tag_id);

	if (!tag) {
		return null;
	}

	const title = `タグ別記事一覧: ${tag.name}`;

	return (
		<DefaultLayout pageTitle={title}>
			<Heading as="h1" size="xl" mb={4}>
				🔖タグ別記事一覧:
				<Tag.Root size={"xl"} mx={4} variant={"outline"} bg={"bg.success"}>
					<Tag.Label>#{tag.name}</Tag.Label>
				</Tag.Root>
			</Heading>

			<List.Root gap="2" px={4} variant={"plain"}>
				{tag.content_list.map((item) => (
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
export default BlogTags;
