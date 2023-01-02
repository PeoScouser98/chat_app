import useLocalStorage from "@/hooks/useLocalStorage";
import { collectionGroup } from "firebase/firestore";
import { useState } from "react";
import { useContext, useEffect, useRef } from "react";
import tw from "tailwind-styled-components";
import { AppContext } from "../../context/AppContext";
import { AuthContext } from "../../Context/AuthContext";
import formatDate from "../../helpers/formatDate";
import Avatar from "../Avatar";

const Message = tw.div`chat`;
const ChatHeader = tw.div`chat-header mb-1`;
const BubbleMessage = tw.div`chat-bubble `;
const ChatFooter = tw.time`chat-footer`;

const ChatBubble = ({ messageData }) => {
	const { text, createdAt, sender } = messageData;
	const { currentUser } = useContext(AuthContext);
	const { currentChat } = useContext(AppContext);
	const [auth] = useLocalStorage("auth");
	const [isCurrentUser, setIsCurrentUser] = useState(() => auth === sender._id);
	const scrollRef = useRef();

	useEffect(() => {
		scrollRef?.current.scrollIntoView({ behavior: "auto" });
	}, [messageData]);

	// const { chattingUser } = currentChat;

	return (
		<Message className={isCurrentUser ? "chat chat-end" : "chat chat-start"} ref={scrollRef}>
			<div className="chat-image ">
				<Avatar imageUrl={sender?.avatar} size={10} />
			</div>
			<ChatHeader>{sender?.username}</ChatHeader>
			{messageData.image && <img src={messageData.image} className="w-32 h-32 object-cover object-center rounded-lg" />}
			<BubbleMessage className={isCurrentUser ? "chat-bubble-primary" : ""}>{text}</BubbleMessage>
			<ChatFooter>{formatDate(createdAt)}</ChatFooter>
		</Message>
	);
};

export default ChatBubble;
