import { useEffect } from "react";
import { useLocation } from "wouter";
import { sendPageView } from "@/lib/gtag";

const GAListener = () => {
	const [location] = useLocation();

	useEffect(() => {
		sendPageView(location + window.location.search);
	}, [location]);

	return null;
};
export default GAListener;
