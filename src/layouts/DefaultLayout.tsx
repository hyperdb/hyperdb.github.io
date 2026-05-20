import { Container } from "@chakra-ui/react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MetaInfo from "@/components/MetaInfo";

interface DefaultLayoutProps {
	children?: React.ReactNode;
	pageTitle?: string;
	pageDescription?: string;
	pageKeywords?: string;
	pageAuthor?: string;
}

const DefaultLayout = (props: DefaultLayoutProps) => {
	return (
		<>
			<MetaInfo
				title={props.pageTitle}
				description={props.pageDescription}
				keywords={props.pageKeywords}
				author={props.pageAuthor}
			/>
			<Header />
			<Container maxW={"3xl"} mt={12} mb={16} minH={"calc(100vh - 16rem)"}>
				{props.children}
			</Container>
			<Footer />
		</>
	);
};
export default DefaultLayout;
