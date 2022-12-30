import { useContext } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import AppProvider from "./context/AppContext";
import AuthProvider, { AuthContext } from "./context/AuthContext";
import ChatProvider from "./context/ChatContext";
import "./index.css";

import ChatWindow from "./pages";
import PrivatePage from "./pages/PrivatePage";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

const App = () => {
	return (
		<BrowserRouter>
			<AuthProvider>
				<AppProvider>
					<ChatProvider>
						<Routes>
							<Route
								path="/"
								element={
									<PrivatePage>
										<ChatWindow />
									</PrivatePage>
								}
							/>
							<Route path="/signin" element={<Signin />} />
							<Route path="/signup" element={<Signup />} />
						</Routes>
					</ChatProvider>
				</AppProvider>
			</AuthProvider>
		</BrowserRouter>
	);
};

export default App;
