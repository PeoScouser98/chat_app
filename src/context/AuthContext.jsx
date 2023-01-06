import instance from "@/api/instance.api";
import { useEffect } from "react";
import { createContext, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { getUser } from "../api/user.api";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
	const navigate = useNavigate();
	const [currentUser, setCurrentUser] = useState(null);
	const [authenticated, setAuthenticated] = useState(false);

	useQuery({
		queryKey: ["auth"],
		queryFn: getUser,
		enabled: authenticated,
		onSuccess: (data) => {
			navigate("/");
			setCurrentUser(data?.user);
			setAuthenticated(true);
		},
		retryOnMount: authenticated,
		refetchOnMount: authenticated,
	});

	const handleAuthStateChange = () => {
		setAuthenticated(!authenticated);
	};

	useEffect(() => {
		const accessToken = instance.getAccessToken();

		setAuthenticated(accessToken !== null);
	}, [authenticated]);

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
