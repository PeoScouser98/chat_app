import tw from "tailwind-styled-components";
import ChatsList from "./ChatsList";
import Search from "./Search";
import UserControl from "./UserControl";

const DrawerSide = tw.aside`drawer-side `;
const DrawerOverlay = tw.label`drawer-overlay`;
const DrawerSideMenu = tw.div`menu p-4 w-80 bg-base-300 text-base-content`;
const Sidebar = () => {
	return (
		<DrawerSide>
			<DrawerOverlay htmlFor="sidebar-toggle"></DrawerOverlay>
			<DrawerSideMenu>
				<UserControl />
				<Search />
				{/* <RoomList /> */}
				<ChatsList />
			</DrawerSideMenu>
		</DrawerSide>
	);
};

export default Sidebar;
