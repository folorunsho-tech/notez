import { useContext, useEffect } from "react";
import { AppContext } from "../../contexts/NoteContext";

const Settings = () => {
	const { setHeader } = useContext(AppContext);
	useEffect(() => {
		setHeader("Settings");
	}, []);
	return <div>Settings</div>;
};

export default Settings;
