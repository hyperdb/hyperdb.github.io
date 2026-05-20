import BlogList from "@/components/BlogList";
import PageContent from "@/components/PageContent";
import DefaultLayout from "@/layouts/DefaultLayout";
import { PAGE_ID } from "@/lib/constants";

const Blog = () => {
	return (
		<DefaultLayout pageTitle="ブログ一覧">
			<PageContent pageId={PAGE_ID.BLOG}>
				<BlogList />
			</PageContent>
		</DefaultLayout>
	);
};
export default Blog;
