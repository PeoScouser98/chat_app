import { useState } from "react";
import { createContext, useContext, useReducer } from "react";
import { QueryClient, useMutation, useQuery, useQueryClient } from "react-query";
import { createNewChat, getChats, sendMessage } from "../api/chat.api";
import { AuthContext } from "./AuthContext";

const ChatContext = createContext({});

const ChatProvider = ({ children }) => {
	const [chatsList, setChatsList] = useState([]);
	const queryClient = useQueryClient();
	useQuery({
		queryKey: ["chats"],
		queryFn: () => getChats(),
		onSuccess: (data) => {
			setChatsList(data);
		},
	});
	const sendMessageMutation = useMutation(sendMessage, {
		onSuccess: () => {
			queryClient.invalidateQueries("chats");
		},
	});
	const createNewChatMutation = useMutation(createNewChat, {
		onSuccess: () => {
			queryClient.invalidateQueries("chats");
		},
	});
	return (
		<ChatContext.Provider value={(chatsList, setChatsList, sendMessageMutation, createNewChatMutation)}>
			{children}
		</ChatContext.Provider>
	);
};

export { ChatContext };
export default ChatProvider;
