import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ToastContainer } from "react-toastify";
import { Slide } from "react-toastify";
import App from "./App";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import "dotenv";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: true,
			staleTime: 15 * 60 * 1000,
			cacheTime: 15 * 60 * 1000,
			refetchOnMount: true,
			retry: true,
			retryOnMount: true,
			// onSettled: (data) => console.log("data", data),
		},
	},
});

ReactDOM.createRoot(document.getElementById("root")).render(
	<QueryClientProvider client={queryClient}>
		<ToastContainer
			position="top-right"
			autoClose={5000}
			hideProgressBar={true}
			newestOnTop={false}
			closeOnClick
			rtl={false}
			pauseOnFocusLoss
			draggable
			pauseOnHover
			transition={Slide}
			theme="dark"
		></ToastContainer>
		<App />
		<ReactQueryDevtools initialIsOpen={false} />
	</QueryClientProvider>,
);
