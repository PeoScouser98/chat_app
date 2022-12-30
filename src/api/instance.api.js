import axios from "axios";
import { refreshToken } from "./user.api";

const instance = axios.create({
	baseURL: "http://localhost:3001/api",
});

instance.interceptors.request.use(
	(config) => {
		const skipCheckingEndpoints = ["/signin", "/signup", "/refresh-token"];
		if (skipCheckingEndpoints.indexOf(config.url) >= 0) return config;
		const accessToken = instance.getAccessToken();
		config.headers.token = accessToken;
		return config;
	},
	(error) => Promise.reject(error),
);

instance.interceptors.response.use(
	async ({ data, config }) => {
		const skipCheckingEndpoints = ["/signin", "/signup", "/refresh-token"];
		if (skipCheckingEndpoints.indexOf(config.url) >= 0) return data;
		if (data.status === 401) {
			console.log("Access token has expired!");
			const authId = localStorage.getItem("auth");
			if (authId !== null) {
				const newAccessToken = await refreshToken(authId);
				if (typeof newAccessToken === "string") {
					instance.setAccessToken(newAccessToken);
					console.log("newAccessToken :>> ", newAccessToken);
					return instance.request(config);
				}
			}

			return data;
		}
		return data;
	},
	(error) => Promise.reject(error),
);
instance.getAccessToken = function () {
	return localStorage.getItem("accessToken");
};
instance.setAccessToken = function (accessToken) {
	localStorage.setItem("accessToken", accessToken);
};
export default instance;
