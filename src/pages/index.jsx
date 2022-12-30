import { useContext } from "react";
import tw from "tailwind-styled-components";
import Default from "../components/Default";
import Sidebar from "../components/Sidebar/index";
import { ChatContext } from "../context/ChatContext";
import ChatWindow from "../components/Chatbox/index";
import { AppContext } from "../context/AppContext";
// * styled components
const DrawerWrapper = tw.div`drawer drawer-mobile`;
const DrawerContent = tw.div`drawer-content h-screen flex flex-col justify-between items-stretch`;
const DrawerToggle = tw.input`drawer-toggle`;

const ChatPage = () => {
	const { currentChat } = useContext(AppContext);

	return (
		<DrawerWrapper data-theme="dark">
			<DrawerToggle id="sidebar-toggle" type="checkbox" />
			<DrawerContent>{currentChat === null ? <Default /> : <ChatWindow />}</DrawerContent>
			<Sidebar />
		</DrawerWrapper>
	);
};

export default ChatPage;
