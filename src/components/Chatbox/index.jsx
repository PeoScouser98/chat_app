import tw from "tailwind-styled-components";
import ChatBubble from "./ChatBubble";
import ChatForm from "./ChatForm";
import ChatHeader from "./ChatHeader";
import ChatBox from "./ChatBox";
import { Fragment } from "react";

const ChatWindow = () => {
	return (
		<Fragment>
			<ChatHeader />
			<ChatBox />
			<ChatForm />
		</Fragment>
	);
};

export default ChatWindow;
