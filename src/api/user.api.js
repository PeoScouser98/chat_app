import instance from "./instance.api";

export const signin = async (data) => {
	try {
		const res = await instance.post("/signin", data);
		console.log(res);
		return res;
	} catch (error) {
		console.log(error.message);
	}
};

export const signup = async (data) => {
	try {
		return await instance.post("/signup", data);
	} catch (error) {
		console.log(error.message);
	}
};

export const getUser = async () => {
	try {
		const user = await instance.get("/user");
		console.log(user);
		return user;
	} catch (error) {
		console.log(error.message);
	}
};

export const refreshToken = async (authId) => {
	try {
		return await instance.post("/refresh-token", { authId: authId });
	} catch (error) {
		console.log(error.message);
	}
};
