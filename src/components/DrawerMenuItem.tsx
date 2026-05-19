import { Flex, Text } from "@chakra-ui/react";
import { MdLabel } from "react-icons/md";
import { BASE_COLORS } from "@/lib/colors";

interface Props {
	title: string;
	description: string;
	path: string;
	key: string;
}

// 各ページへの遷移
const moveToPath = (path: string) => {
	window.location.href = path;
};

const DrawerMenuItem = (props: Props) => {
	return (
		<Flex
			key={props.key}
			direction="column"
			justify={"flex-start"}
			align={"flex-start"}
			mb={4}
			cursor="pointer"
			onClick={() => moveToPath(props.path)}
		>
			<Text
				textStyle={"md"}
				color={BASE_COLORS.TEXT.base}
				_dark={{ color: BASE_COLORS.TEXT._dark }}
			>
				<Flex align={"center"} gap={1} mb={1}>
					<MdLabel />
					{props.title}
				</Flex>
			</Text>
			<Text textStyle={"xs"}>{props.description}</Text>
		</Flex>
	);
};

export default DrawerMenuItem;
