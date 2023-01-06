import useLocalStorage from "@/hooks/useLocalStorage";
import { createContext, useContext, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { createNewChat, getChats, sendMessage } from "../api/chat.api";
import { AppContext } from "./AppContext";
import { AuthContext } from "./AuthContext";

const ChatContext = createContext({});

const ChatProvider = ({ children }) => {
	const [chatsList, setChatsList] = useState([]);
	const [messages, setMessages] = useState([]);

	const { authenticated } = useContext(AuthContext);
	const [auth] = useLocalStorage("auth");
	const queryClient = useQueryClient();
	const { data } = useQuery({
		queryKey: ["chats"],
		enabled: authenticated,
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
		onSuccess: () => {
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
		<ChatContext.Provider
			value={{ chatsList, setChatsList, sendMessageMutation, createNewChatMutation, messages, setMessages }}
		>
			{children}
		</ChatContext.Provider>
	);
};

export { ChatContext };
export default ChatProvider;
