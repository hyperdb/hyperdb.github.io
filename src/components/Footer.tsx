import { Box, Container, Flex, Text } from "@chakra-ui/react";
import { useScrollVisibility } from "@/hooks/useScrollVisibility";

const Footer = () => {
	const { isVisible } = useScrollVisibility();

	return (
		<Container
			as="footer"
			fluid
			p={0}
			m={0}
			zIndex={20}
			pos={"sticky"}
			bottom={0}
			opacity={isVisible ? 0.85 : 0}
			transition={"opacity 0.35s ease"}
		>
			<Flex
				alignItems="center"
				justifyContent="space-between"
				p={4}
				h={"3rem"}
				gap={4}
			>
				<Box>L</Box>
				<Box>
					<Text textStyle={"sm"}>Copyright &copy; hyperdb 2026</Text>
				</Box>
				<Box>R</Box>
			</Flex>
		</Container>
	);
};
export default Footer;
