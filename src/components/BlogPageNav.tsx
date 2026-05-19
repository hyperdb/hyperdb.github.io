"use client";

import { ButtonGroup, IconButton, Pagination } from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

interface Props {
	maxPosts?: number; // 表示する最大投稿数
	postsPerPage?: number; // 1ページあたりの投稿数
	currentPage?: number; // 現在のページ番号
	onPageChange?: (page: number) => void; // ページ変更時のコールバック関数
}

const BlogPageNav = (props: Props) => {
	return (
		<Pagination.Root
			count={props.maxPosts}
			pageSize={props.postsPerPage}
			defaultPage={props.currentPage}
		>
			<ButtonGroup variant="ghost" size="sm">
				<Pagination.PrevTrigger asChild>
					<IconButton>
						<LuChevronLeft />
					</IconButton>
				</Pagination.PrevTrigger>

				<Pagination.Items
					render={(page) => (
						<IconButton variant={{ base: "ghost", _selected: "outline" }}>
							{page.value}
						</IconButton>
					)}
				/>

				<Pagination.NextTrigger asChild>
					<IconButton>
						<LuChevronRight />
					</IconButton>
				</Pagination.NextTrigger>
			</ButtonGroup>
		</Pagination.Root>
	);
};
export default BlogPageNav;
