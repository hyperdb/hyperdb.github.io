import GitHubContributions from "@/components/GitHubContributions";
import ImageBlock from "@/components/ImageBlock";
import PageContent from "@/components/PageContent";
import DefaultLayout from "@/layouts/DefaultLayout";
import { PAGE_ID, SITE_INFO } from "@/lib/constants";

const Profile = () => {
	return (
		<DefaultLayout>
			<PageContent pageId={PAGE_ID.PROFILE}>
				<ImageBlock
					src={"https://s3.hyperdb.cc/hyperdb-commons/favicon-hyperdb.ico"}
					alt={"Profile Image"}
					radius={"full"}
					maxWidth={"128px"}
					maxHeight={"128px"}
					justify={"center"}
				/>
				<GitHubContributions username={SITE_INFO.GITHUB_USERNAME} />
			</PageContent>
		</DefaultLayout>
	);
};
export default Profile;
