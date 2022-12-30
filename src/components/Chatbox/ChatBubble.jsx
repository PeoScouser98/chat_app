import { useContext, useEffect, useRef } from "react";
import tw from "tailwind-styled-components";
import { AuthContext } from "../../Context/AuthContext";
import { ChatContext } from "../../Context/ChatContext";
import formatDate from "../../helpers/formatDate";

const MessageWrapper = tw.div`flex items-start gap-5 bg-zinc-400/5 p-5 rounded-lg w-fit`;
const MessageContentWrapper = tw.div`flex-1 flex flex-col justify-start items-start text-left `;

const ChatBubble = ({ messageData }) => {
	const { message, createdAt, senderId, date } = messageData;
	const currentUser = useContext(AuthContext);
	const { chatState } = useContext(ChatContext);
	const isCurrentUser = currentUser.uid == senderId;
	const scrollRef = useRef();

	useEffect(() => {
		scrollRef?.current.scrollIntoView({ behavior: "smooth" });
	}, [messageData]);
	return (
		<div className={isCurrentUser ? "chat chat-end" : "chat chat-start"} ref={scrollRef}>
			<div className="chat-image avatar">
				<div className="w-10 rounded-full">
					<img src={isCurrentUser ? currentUser.photoURL : chatState.user.photoURL} />
				</div>
			</div>
			<div className="chat-header mb-1">
				{isCurrentUser ? currentUser.displayName : chatState.user.displayName}
				{/* <time className="text-xs opacity-50">{}</time> */}
			</div>
			{messageData.attachment && (
				<img src={messageData.attachment} className="w-32 h-32 object-cover object-center rounded-lg" />
			)}
			<div className={isCurrentUser ? "chat-bubble chat-bubble-primary" : "chat-bubble"}>{message}</div>
			<time className="chat-footer opacity-50">{formatDate(date.seconds)}</time>
		</div>
	);
};

export default ChatBubble;
