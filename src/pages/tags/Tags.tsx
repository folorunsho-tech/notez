import { useContext, useEffect } from "react";
import { AppContext } from "../../contexts/NoteContext";
import { NavLink, Outlet } from "react-router";
import { ScrollAreaAutosize, Text } from "@mantine/core";
import { IconTag } from "@tabler/icons-react";
import { useLocation } from "react-router";

const Tags = () => {
	const { setHeader, tagsWN } = useContext(AppContext);
	const location = useLocation();
	useEffect(() => {
		if (location.pathname == "/tags") setHeader("Tags");
	}, [location]);
	return (
		<main className='p-3 space-y-3'>
			<nav className='md:hidden'>
				<ScrollAreaAutosize type='scroll' className='flex gap-1'>
					{tagsWN.map((tag, index) => (
						<NavLink
							key={index}
							to={`/tags/${tag.id}`}
							className={({ isActive }) =>
								isActive
									? "text-blue-500 w-max bg-gray-100 p-2 rounded-md flex gap-2 items-center"
									: "text-gray-700 w-max p-2 rounded-md flex gap-2 items-center hover:bg-gray-100 transition-colors duration-200"
							}
						>
							<IconTag size={20} />
							<Text size='sm'>{tag.label}</Text>
						</NavLink>
					))}
				</ScrollAreaAutosize>
			</nav>
			<Outlet />
		</main>
	);
};

export default Tags;
