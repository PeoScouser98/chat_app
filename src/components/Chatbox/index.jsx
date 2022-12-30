import tw from "tailwind-styled-components";
import ChatBubble from "./ChatBubble";

const ChatsContainer = tw.div`flex flex-col justify-start gap-3 overflow-y-scroll scroll p-8 h-full`;

const ChatBox = () => {
	return (
		<ChatsContainer>
			{/* <ChatHeader/> */}
			{Array.isArray(messages) && messages?.map((msg, index) => <ChatBubble messageData={msg} key={index} />)}
			<ChatForm />
		</ChatsContainer>
	);
};

export default ChatBox;
