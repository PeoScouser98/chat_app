import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { AppContext } from "../../context/AppContext";
import { ChatContext } from "../../context/ChatContext";
import UserInfo from "../UserInfo";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useEffect } from "react";

const ChatsList = () => {
	const { chatsList, setChatsList } = useContext(ChatContext);
	const { currentUser } = useContext(AuthContext);
	const { setCurrentChat, socket } = useContext(AppContext);
	const [auth] = useLocalStorage("auth");

	useEffect(() => {
		socket.on("notify_user_online", (user) => {
			setChatsList((prev) => {
				return prev.map((chat) => {
					chat.chattingUser.onlineStatus = user.online;

					return chat;
				});
			});
			chatsList.forEach((chat) => {
				chat.chattingUser.onlineStatus = user.online;
			});
		});
	}, [socket]);
	return (
		<ul className="menu">
			{Array.isArray(chatsList) &&
				chatsList.map((chat) => {
					return (
						<li onClick={() => setCurrentChat(chat)} key={chat?._id}>
							<UserInfo
								avatar={chat.chattingUser?.avatar}
								username={chat.chattingUser?.username}
								status={chat.chattingUser?.onlineStatus}
							>
								<span>{chat.lastestMessage}</span>
							</UserInfo>
						</li>
					);
				})}
		</ul>
	);
};

export default ChatsList;
