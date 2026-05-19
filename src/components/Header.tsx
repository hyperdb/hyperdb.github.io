import { Box, Container, Flex, Heading } from "@chakra-ui/react";
import SideDrawer from "@/components/SideDrawer";
import { ColorModeButton } from "@/components/ui/color-mode";
import { useScrollVisibility } from "@/hooks/useScrollVisibility";
import { SITE_INFO } from "@/lib/constants";

const goHome = () => {
	window.location.href = "/";
};

const Header = () => {
	const { isVisible } = useScrollVisibility();
	return (
		<Container
			as="header"
			fluid
			p={0}
			m={0}
			pos={"sticky"}
			top={0}
			zIndex={10}
			borderBottom={"1px solid"}
			borderColor={"border"}
			bg={"bg.muted"}
			opacity={isVisible ? 0.85 : 0}
			transition={"opacity 0.35s ease"}
		>
			<Flex
				alignItems="center"
				justifyContent="space-between"
				gap={4}
				p={4}
				h={"5rem"}
			>
				<SideDrawer />
				<Box>
					<Heading size="lg" onClick={goHome} cursor="pointer">
						{SITE_INFO.TITLE}
					</Heading>
				</Box>
				<Box>
					<ColorModeButton />
				</Box>
			</Flex>
		</Container>
	);
};
export default Header;
