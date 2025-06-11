import { useContext, useEffect, useState } from "react";
import { AppContext } from "../contexts/NoteContext";
import { Text } from "@mantine/core";
import { NavLink, Outlet, useSearchParams } from "react-router";

import {
	IconArchive,
	IconHome,
	IconSearch,
	IconSettings,
	IconTag,
} from "@tabler/icons-react";

const Mobile = () => {
	const { heading } = useContext(AppContext);
	const [pos, setPos] = useState("absolute");
	const [searchParams] = useSearchParams();
	const mode = searchParams.get("mode");

	useEffect(() => {
		if (mode == "create" || mode == "edit") {
			setPos("");
		} else {
			setPos("absolute");
		}
	}, [mode]);

	return (
		<>
			<header className='flex items-center justify-between p-4 bg-gray-200 relative'>
				<Text size='xl' fs='italic' fw={700}>
					notez
				</Text>
				<Text size='md' fw={500}>
					{heading}
				</Text>
			</header>
			<Outlet />
			<nav
				className={`bg-gray-200 shadow ${pos} mt-2 border-t bottom-0 w-full border-gray-300 py-2 px-3 flex gap-2 justify-between`}
			>
				<NavLink
					to='/'
					className={({ isActive }) =>
						isActive
							? "text-blue-500 p-2 flex flex-col gap-1 justify-center items-center"
							: "text-gray-700 p-2 flex flex-col gap-1 items-center"
					}
				>
					<IconHome size={20} />
				</NavLink>
				<NavLink
					to='/search'
					className={({ isActive }) =>
						isActive
							? "text-blue-500 p-2 flex flex-col gap-1 justify-center items-center"
							: "text-gray-700 p-2 flex flex-col gap-1 items-center"
					}
				>
					<IconSearch size={20} />
				</NavLink>
				<NavLink
					to='/m/archive'
					className={({ isActive }) =>
						isActive
							? "text-blue-500 p-2 flex flex-col gap-1  items-center"
							: "text-gray-700 p-2 flex flex-col gap-1 items-center"
					}
				>
					<IconArchive size={20} />
				</NavLink>
				<NavLink
					to='/tags'
					className={({ isActive }) =>
						isActive
							? "text-blue-500 p-2 flex flex-col gap-1  items-center"
							: "text-gray-700 p-2 flex flex-col gap-1 items-center"
					}
				>
					<IconTag size={20} />
				</NavLink>
				<NavLink
					to='/settings'
					className={({ isActive }) =>
						isActive
							? "text-blue-500 p-2 flex flex-col gap-1  items-center"
							: "text-gray-700 p-2 flex flex-col gap-1 items-center"
					}
				>
					<IconSettings size={20} />
				</NavLink>
			</nav>
		</>
	);
};

export default Mobile;
