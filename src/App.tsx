"use client";
import { useMediaQuery } from "@mantine/hooks";
import { useContext, useEffect } from "react";
import { AppContext } from "./contexts/NoteContext";
import Desktop from "./components/app/Desktop";
import Mobile from "./components/app/Mobile";
function App() {
	const { setHeader } = useContext(AppContext);
	const matches = useMediaQuery("(min-width: 49rem)");

	useEffect(() => {
		setHeader("All Notes");
	}, []);
	if (matches) {
		return <Desktop />;
	}
	return <Mobile />;
}

export default App;
