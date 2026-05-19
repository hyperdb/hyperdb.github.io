import { Box, Flex, Heading, Tag, TagLabel, Text } from "@chakra-ui/react";
import MarkdownBlock from "@/components/MarkdownBlock";
import dateFromISO from "@/lib/dateFromISO";
import getHash from "@/lib/getHash";
import type { postInfo } from "@/lib/loadPost";
import loadPost from "@/lib/loadPost";

const onCategoryClickHandler = (categoryId: string) => {
	window.location.href = `/blog/categories/${categoryId}`;
};
const onTagClickHandler = (tagID: string) => {
	window.location.href = `/blog/tags/${tagID}`;
};

interface Props {
	pageId: string;
	displayDate?: boolean;
	children?: React.ReactNode;
}

const PostContent = (props: Props) => {
	// 投稿データを読み込む
	const postData: postInfo = loadPost(props.pageId);
	// 作成日と更新日をISO形式から変換して取得する
	const createdAt = postData ? dateFromISO(postData.created_at) : "";
	const updatedAt = postData ? dateFromISO(postData.updated_at) : "";

	return (
		<Box>
			<Box as="article" className="page-content">
				{/* カテゴリー表示 */}
				<Flex align={"center"} justify={"flex-start"} gap={2} mb={6}>
					カテゴリー：
					<Tag.Root
						size={"md"}
						variant={"subtle"}
						px={4}
						py={1}
						bg={"bg.emphasized"}
						cursor={"pointer"}
						onClick={() => onCategoryClickHandler(getHash(postData.category))}
					>
						<TagLabel>{postData.category}</TagLabel>
					</Tag.Root>
				</Flex>
				{/* タイトルと内容を表示 */}
				<Heading as="h1" size="lg" mb={4}>
					{postData.title}
				</Heading>
				{postData && <MarkdownBlock content={postData.content} />}

				{/* サブコンテンツがあれば表示 */}
				{props.children && (
					<section className="sub-content">{props.children}</section>
				)}

				{/* タグ表示 */}
				<Flex align={"center"} justify={"flex-start"} gap={2} mb={4} mt={6}>
					タグ：
					{postData.tags.length === 0 && <>タグは設定されていません</>}
					{postData.tags.length > 0 &&
						postData.tags.map((tag) => (
							<Tag.Root
								key={tag}
								size={"md"}
								px={2}
								py={1}
								variant={"outline"}
								bg={"bg.success"}
								cursor={"pointer"}
								onClick={() => onTagClickHandler(getHash(tag))}
							>
								<TagLabel>#{tag}</TagLabel>
							</Tag.Root>
						))}
				</Flex>
			</Box>

			{props.displayDate && (
				<Flex justify={"flex-end"} align={"center"} gap={4} mt={8}>
					<Text textStyle={"xs"}>作成日: {createdAt}</Text>
					<Text textStyle={"xs"}>更新日: {updatedAt}</Text>
				</Flex>
			)}
		</Box>
	);
};
export default PostContent;
