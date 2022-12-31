import { useContext } from "react";
import tw from "tailwind-styled-components";
import ChatWindow from "../components/Chatbox/index";
import HeroBanner from "../components/Hero";
import Sidebar from "../components/Sidebar/index";
import { AppContext } from "../context/AppContext";

// * styled components
const DrawerWrapper = tw.div`drawer drawer-mobile`;
const DrawerContent = tw.div`drawer-content h-screen flex flex-col justify-between items-stretch`;
const DrawerToggle = tw.input`drawer-toggle`;
export const DrawerToggleButton = tw.label`btn btn-ghost btn-square z-[999] text-xl`;

const ChatPage = () => {
	const { currentChat } = useContext(AppContext);

	return (
		<DrawerWrapper data-theme="dark">
			<DrawerToggle id="sidebar-toggle" type="checkbox" />
			<DrawerContent>{currentChat === null ? <HeroBanner /> : <ChatWindow />}</DrawerContent>
			<Sidebar />
		</DrawerWrapper>
	);
};

export default ChatPage;
