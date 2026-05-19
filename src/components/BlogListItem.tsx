import { Flex, Text } from "@chakra-ui/react";
import dateFromISO from "@/lib/dateFromISO";
import type { postInfo } from "@/lib/loadPost";

interface Props {
	postData: postInfo;
}

// ブログ記事詳細への遷移
const onClickHandler = (postId: string) => {
	window.location.href = `/blog/${postId}`;
};

const BlogListItem = (props: Props) => {
	// 投稿日と更新日をISO形式から変換して取得する
	const createdAt = dateFromISO(props.postData.created_at);
	const updatedAt = dateFromISO(props.postData.updated_at);

	return (
		<Flex
			w={{ base: "100%", md: "48%" }}
			height={{ base: "4.5em", md: "6em" }}
			flexDirection={"column"}
			justifyContent={"space-between"}
			borderWidth={1}
			borderRadius={8}
			p={2}
			mx={{ base: 0, md: 1 }}
			my={1}
			_hover={{ bg: { base: "gray.200", _dark: "gray.700" } }}
		>
			{/* ブログタイトル */}
			<Text
				textStyle={{ base: "md", md: "md" }}
				onClick={() => onClickHandler(props.postData.id)}
				cursor={"pointer"}
				mb={2}
			>
				{props.postData.title}
			</Text>
			{/* 投稿日と更新日を表示 */}
			<Flex
				gap={1}
				flexDirection={{ base: "row", md: "column" }}
				justifyContent={{ base: "flex-end", md: "flex-start" }}
				alignItems={{ base: "flex-end", md: "flex-end" }}
			>
				<Text textStyle={"xs"}>投稿日: {createdAt}</Text>
				<Text textStyle={"xs"}>更新日: {updatedAt}</Text>
			</Flex>
		</Flex>
	);
};
export default BlogListItem;
