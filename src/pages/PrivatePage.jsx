import React from "react";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import useLocalStorage from "../hooks/useLocalStorage";

const PrivatePage = ({ children }) => {
	const { authenticated } = useContext(AuthContext);
	return authenticated ? children : <Navigate to="/signin" replace />;
};

export default PrivatePage;
