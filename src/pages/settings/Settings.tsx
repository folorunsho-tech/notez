import { useContext, useEffect } from "react";
import { AppContext } from "../../contexts/NoteContext";
import { useLocation } from "react-router";
// import { Tabs } from "@mantine/core";
// import { IconDatabaseCog, IconTags } from "@tabler/icons-react";
import TagsManager from "../../components/settings/TagsManager";
// import BackupR from "../../components/settings/BackupR";

const Settings = () => {
	const { setHeader } = useContext(AppContext);
	const location = useLocation();
	useEffect(() => {
		if (location.pathname == "/settings") setHeader("Settings");
	}, [location]);
	return (
		// <Tabs defaultValue='manager' keepMounted={false}>
		// 	<Tabs.List>
		// 		<Tabs.Tab value='manager' leftSection={<IconTags size={24} />}>
		// 			Tags Manager
		// 		</Tabs.Tab>
		// 		<Tabs.Tab value='backup' leftSection={<IconDatabaseCog size={24} />}>
		// 			Backup/Restore
		// 		</Tabs.Tab>
		// 	</Tabs.List>
		// 	<Tabs.Panel value='backup'>
		// 		<BackupR />
		// 	</Tabs.Panel>
		// 	<Tabs.Panel value='manager'>
		// 		<TagsManager />
		// 	</Tabs.Panel>
		// </Tabs>
		<>
			<TagsManager />
		</>
	);
};

export default Settings;
