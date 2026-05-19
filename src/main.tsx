import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "@/components/ui/provider";
import "./index.scss";
import App from "./App.tsx";
import { initGA } from "./lib/gtag";

initGA();

const rootElement = document.getElementById("root");
if (rootElement) {
	createRoot(rootElement).render(
		<StrictMode>
			<Provider>
				<App />
			</Provider>
		</StrictMode>,
	);
} else {
	console.error("Root element not found");
	throw new Error("Root element not found");
}
