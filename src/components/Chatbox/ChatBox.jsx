import { AppContext } from "@/context/AppContext";
import { ChatContext } from "@/context/ChatContext";
import { useContext, useEffect, useRef, useState } from "react";
import ChatBubble from "./ChatBubble";

const ChatBox = () => {
	const { currentChat, socket } = useContext(AppContext);
	const { chatsList, messages, setMessages } = useContext(ChatContext);

	useEffect(() => {
		setMessages(currentChat.messages);
		socket.on("receive_message", (newMessage) => {
			setMessages((prev) => [...prev, newMessage]);
			console.log(newMessage);
		});
		return () => {
			socket.off("receive_message");
		};
	}, [socket]);

	return (
		<div className="flex flex-1 flex-col gap-4 p-4 overflow-y-scroll scroll">
			{Array.isArray(messages) && messages?.map((message, index) => <ChatBubble messageData={message} key={index} />)}
		</div>
	);
};

export default ChatBox;
