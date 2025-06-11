"use client";
import { useMediaQuery } from "@mantine/hooks";
import Desktop from "./components/app/Desktop";
import Mobile from "./components/app/Mobile";
import { useLocation } from "react-router";
import { useContext, useEffect } from "react";
import { AppContext } from "./contexts/NoteContext";
function App() {
	const { setHeader } = useContext(AppContext);

	const location = useLocation();
	useEffect(() => {
		if (location.pathname === "/") setHeader("Home");
	}, [location]);
	const matches = useMediaQuery("(min-width: 49rem)");
	if (matches) {
		return <Desktop />;
	} else if (!matches) return <Mobile />;
}

export default App;
