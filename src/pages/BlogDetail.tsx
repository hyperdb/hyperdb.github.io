import PostContent from "@/components/PostContent";
import DefaultLayout from "@/layouts/DefaultLayout";
import type { postInfo } from "@/lib/loadPost";
import loadPost from "@/lib/loadPost";

interface Props {
	post_id: string;
}

const PageDetail = (props: Props) => {
	const postData: postInfo | null = loadPost(props.post_id);

	if (!postData) {
		return null;
	}

	return (
		<DefaultLayout pageTitle={postData.title}>
			<PostContent pageId={props.post_id} displayDate={true} />
		</DefaultLayout>
	);
};
export default PageDetail;
