import "@styles/globals.css";

import Nav from "@components/Nav";
import Provider from "@components/Provider";
import ToasterProvider from "./providers/ToastProvider";

export const metadata = {
	title: "Share Prompts",
	description: "Discover & Share AI Prompts",
};

const RootLayout = ({ children }) => {
	return (
		<html lang="en">
			<body>
				<Provider>
					<div className="main">
						<div className="gradient" />
					</div>
					<main className="app">
						<ToasterProvider />
						<Nav />
						{children}
					</main>
				</Provider>
			</body>
		</html>
	);
};

export default RootLayout;
