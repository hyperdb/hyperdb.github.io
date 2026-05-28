import GitHubContributions from "@/components/GitHubContributions";
import ImageBlock from "@/components/ImageBlock";
import PageContent from "@/components/PageContent";
import DefaultLayout from "@/layouts/DefaultLayout";
import { PAGE_ID, SITE_INFO, SITE_SETTINGS } from "@/lib/constants";

const Profile = () => {
	return (
		<DefaultLayout pageTitle="Profile">
			<PageContent pageId={PAGE_ID.PROFILE}>
				<ImageBlock
					src={`${SITE_SETTINGS.COMMON_STORAGE}/favicon-hyperdb.ico`}
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
