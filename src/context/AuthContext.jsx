import { useEffect, useRef } from "react";
import { createContext, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import instance from "../api/instance.api";
import { getUser } from "../api/user.api";
import useLocalStorage from "../hooks/useLocalStorage";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
	const navigate = useNavigate();
	const [currentUser, setCurrentUser] = useState(null);
	const [authenticated, setAuthenticated] = useState(false);

	useQuery({
		queryKey: ["auth"],
		queryFn: getUser,
		enabled: instance.getAccessToken() !== null,
		onSuccess: (data) => {
			if (data.status === 200) {
				navigate("/");
				setCurrentUser(data.user);
				setAuthenticated(true);
			}
			if (data.status === 401) {
				navigate("/signin");
				setCurrentUser(null);
				setAuthenticated(false);
			}
		},
		retryOnMount: true,
	});

	const handleAuthStateChange = () => {
		setAuthenticated(!authenticated);
	};

	return (
		<AuthContext.Provider
			value={{ currentUser, setCurrentUser, authenticated, setAuthenticated, handleAuthStateChange }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext };
export default AuthProvider;
