import useLocalStorage from "@/hooks/useLocalStorage";
import { createContext, useContext, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { createNewChat, getChats, sendMessage } from "../api/chat.api";
import { AppContext } from "./AppContext";
import { AuthContext } from "./AuthContext";

const ChatContext = createContext({});

const ChatProvider = ({ children }) => {
	const [chatsList, setChatsList] = useState([]);
	// const { authenticated,  } = useContext(AuthContext);
	const { socket, setCurrentChat } = useContext(AppContext);
	const [auth] = useLocalStorage("auth");
	const queryClient = useQueryClient();
	const { data } = useQuery({
		queryKey: ["chats"],
		enabled: true,
		queryFn: getChats,
		onSettled: (data) => {
			data.forEach((chat) => {
				chat["chattingUser"] = chat.members.find((member) => member?._id !== auth);
			});
			setChatsList(data);
		},
	});

	const sendMessageMutation = useMutation({
		mutationKey: ["chats"],
		mutationFn: sendMessage,
		onSettled: (data) => {
			setCurrentChat((prev) => {
				prev.messages = [...data.messages];
				return prev;
			});
			const newMessage = data.messages[data.messages?.length - 1];
			const receiver = data.members.find((member) => member._id !== auth);
			socket.emit("send_message", {
				chatId: data._id,
				...newMessage,
				receiver,
			});
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries("chats");
		},
	});

	const createNewChatMutation = useMutation({
		mutationFn: createNewChat,
		onSuccess: () => {
			queryClient.invalidateQueries("chats");
		},
	});

	return (
		<ChatContext.Provider value={{ chatsList, setChatsList, sendMessageMutation, createNewChatMutation }}>
			{children}
		</ChatContext.Provider>
	);
};

export { ChatContext };
export default ChatProvider;
