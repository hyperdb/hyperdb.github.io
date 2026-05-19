import { CloseButton, Drawer, Portal } from "@chakra-ui/react";
import { IoMenu } from "react-icons/io5";
import DrawerMenu from "@/components/DrawerMenu";
import { BASE_COLORS } from "@/lib/colors";

const SideDrawer = () => {
	return (
		<Drawer.Root placement="start" size={"sm"}>
			<Drawer.Trigger
				asChild
				color={BASE_COLORS.TEXT.base}
				_dark={{ color: BASE_COLORS.TEXT._dark }}
				zIndex={11}
			>
				<IoMenu size={24} />
			</Drawer.Trigger>
			<Portal>
				<Drawer.Backdrop />
				<Drawer.Positioner>
					<Drawer.Content
						bg={BASE_COLORS.BACKGROUND.base}
						color={BASE_COLORS.TEXT.base}
						_dark={{
							bg: BASE_COLORS.BACKGROUND._dark,
							color: BASE_COLORS.TEXT._dark,
						}}
					>
						{/* ドロワーのヘッダー */}
						<Drawer.Header>
							<Drawer.Title>コンテンツ一覧</Drawer.Title>
						</Drawer.Header>
						{/* ドロワーのボディ */}
						<Drawer.Body>
							<DrawerMenu />
						</Drawer.Body>
						{/* ドロワーのフッター */}
						<Drawer.Footer></Drawer.Footer>
						<Drawer.CloseTrigger asChild>
							<CloseButton size="sm" />
						</Drawer.CloseTrigger>
					</Drawer.Content>
				</Drawer.Positioner>
			</Portal>
		</Drawer.Root>
	);
};
export default SideDrawer;
