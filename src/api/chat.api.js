import instance from "./instance.api";

export const getChats = async () => {
	try {
		return await instance.get("/chats");
	} catch (error) {
		console.log(error.message);
	}
};

export const sendMessage = async (id, data) => {
	try {
		return await instance.post(`/chats/${id}`, data);
	} catch (error) {
		console.log(error.message);
	}
};

export const findUserChat = async (keyword) => {
	try {
		return await instance.post("/users/search", { keyword: keyword });
	} catch (error) {
		console.log(error.message);
	}
};

export const findChat = async (user) => {
	try {
		return await instance.get(`/chats/${user._id}/find-chat`);
	} catch (error) {
		console.log(error.message);
	}
};

export const createNewChat = async (data) => {
	try {
		console.log(data);
		return await instance.post("/chats", data);
	} catch (error) {
		console.log(error.message);
	}
};
