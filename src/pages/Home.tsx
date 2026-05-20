import PageContent from "@/components/PageContent";
import DefaultLayout from "@/layouts/DefaultLayout";
import { PAGE_ID } from "@/lib/constants";

const Home = () => {
	return (
		<DefaultLayout pageTitle="Home">
			<PageContent pageId={PAGE_ID.HOME} />
		</DefaultLayout>
	);
};
export default Home;
