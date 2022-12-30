import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { ChatContext } from "../../context/ChatContext";

const ChatsList = () => {
	const { chatsList } = useContext(ChatContext);
	const { setCurrentChat } = useContext(AppContext);
	const selectChat = async (chat) => {
		setCurrentChat(chat);
	};
	return (
		<ul className="menu">
			{Array.isArray(chatsList) &&
				chatsList.map((chat) => (
					<li onClick={() => selectChat(chat)} key={chat?._id}>
						<UserInfo></UserInfo>
					</li>
				))}
		</ul>
	);
};

export default ChatsList;
