import { Box, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import MarkdownBlock from "@/components/MarkdownBlock";
import dateFromISO from "@/lib/dateFromISO";
import loadPage from "@/lib/loadPage";

interface Props {
	pageId: string;
	displayDate?: boolean;
	children?: React.ReactNode;
}

const PageContent = (props: Props) => {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const animationFrameId = requestAnimationFrame(() => {
			setIsVisible(true);
		});

		return () => cancelAnimationFrame(animationFrameId);
	}, []);

	// ページデータを読み込む
	const pageData = loadPage(props.pageId);
	// 作成日と更新日をISO形式から変換して取得する
	const createdAt = pageData ? dateFromISO(pageData.created_at) : "";
	const updatedAt = pageData ? dateFromISO(pageData.updated_at) : "";

	return (
		<Box
			as="main"
			className="page-container"
			opacity={isVisible ? 1 : 0}
			transition="opacity 0.45s ease-out"
		>
			<Box as="article" className="page-content">
				{pageData && <MarkdownBlock content={pageData.content} />}
			</Box>

			{props.children && (
				<Box as="section" className="sub-content">
					{props.children}
				</Box>
			)}

			{props.displayDate && (
				<Flex justify={"flex-end"} align={"center"} gap={4} mt={8}>
					<Text textStyle={"xs"}>作成日: {createdAt}</Text>
					<Text textStyle={"xs"}>更新日: {updatedAt}</Text>
				</Flex>
			)}
		</Box>
	);
};
export default PageContent;
