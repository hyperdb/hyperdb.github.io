import { Container } from "@chakra-ui/react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

interface DefaultLayoutProps {
	children?: React.ReactNode;
}

const DefaultLayout = (props: DefaultLayoutProps) => {
	return (
		<>
			<Header />
			<Container maxW={"3xl"} mt={12} mb={16} minH={"calc(100vh - 16rem)"}>
				{props.children}
			</Container>
			<Footer />
		</>
	);
};
export default DefaultLayout;
