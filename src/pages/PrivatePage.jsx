import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import useLocalStorage from "../hooks/useLocalStorage";

const PrivatePage = ({ children }) => {
	const { authenticated, currentUser } = useContext(AuthContext);
	console.log(currentUser);
	return authenticated ? children : <Navigate to="/signin" replace={true} />;
};

export default PrivatePage;
