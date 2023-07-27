import React from "react";
import { QueryClientProvider } from "react-query";
import { queryClient } from "../utils/utils";
import { NavBar } from "../components/Molecules/NavBar";

import "../styles/globals.css";

const MyApp = ({ Component, pageProps }) => {
	return (
		<QueryClientProvider client={queryClient}>
			<NavBar />
			<Component {...pageProps} />
		</QueryClientProvider>
	);
};

export default MyApp;
