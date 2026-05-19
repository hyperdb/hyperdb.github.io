import { Center, Container, Flex } from "@chakra-ui/react";
import { useState } from "react";
import BlogListItem from "@/components/BlogListItem";
import BlogPageNav from "@/components/BlogPageNav";
import type { postInfo } from "@/lib/loadPost";
import loadPosts from "@/lib/loadPosts";

const BlogList = () => {
	// 投稿データを読み込む
	const posts = loadPosts();
	posts.sort(
		(a, b) => (a.created_at > b.created_at ? -1 : 1), // 投稿日時の降順でソート
	);
	// 1ページあたりの投稿数を設定
	const postPerPage = 8;
	// 現在のページ番号と表示する投稿の状態を管理
	const [currentPage, setCurrentPage] = useState(1);
	// 現在のページに表示する投稿を計算して状態に設定
	const [blogPosts, setBlogPosts] = useState<postInfo[]>(
		posts.slice((currentPage - 1) * postPerPage, currentPage * postPerPage),
	);

	return (
		<Container>
			{/* ページネーションコンポーネントを表示 */}
			<Center mb={8}>
				<BlogPageNav
					maxPosts={posts.length}
					postsPerPage={postPerPage}
					currentPage={currentPage}
					onPageChange={(page) => {
						setCurrentPage(page);
						setBlogPosts(
							posts.slice((page - 1) * postPerPage, page * postPerPage),
						);
					}}
				/>
			</Center>
			{/* ブログ投稿のリストを表示 */}
			<Flex className="blog-list" wrap={"wrap"} w={"100%"}>
				{blogPosts.map((post) => (
					<BlogListItem key={post.id} postData={post} />
				))}
			</Flex>
		</Container>
	);
};
export default BlogList;
