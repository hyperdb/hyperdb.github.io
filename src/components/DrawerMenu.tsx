import { VStack } from "@chakra-ui/react";
import type { DrawerMenuItemType } from "@/lib/constants";
import { DRAWER_MENU_ITEMS } from "@/lib/constants";
import DrawerMenuItem from "./DrawerMenuItem";

const DrawerMenu = () => {
	return (
		<VStack align="stretch">
			{DRAWER_MENU_ITEMS.map((item: DrawerMenuItemType) => (
				<DrawerMenuItem {...item} key={item.key} />
			))}
		</VStack>
	);
};
export default DrawerMenu;
