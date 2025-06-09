"use client";
import { ScrollAreaAutosize, Text } from "@mantine/core";
import { NavLink, Outlet } from "react-router";
import {
	IconArchive,
	IconHome,
	IconSettings,
	IconTag,
} from "@tabler/icons-react";
import Search from "../components/Search";
import { useContext } from "react";
import { AppContext } from "../contexts/NoteContext";
const Desktop = () => {
	const { tagsWN, heading } = useContext(AppContext);

	return (
		<main className='flex  h-screen'>
			<nav className='w-1/6 p-3 border-r border-gray-200 flex flex-col'>
				<Text size='xl' fs='italic' fw={700} mb='md'>
					notez
				</Text>
				<div className='w-full flex flex-col gap-2 pb-4 border-b border-gray-300'>
					<NavLink
						to='/'
						className={({ isActive }) =>
							isActive
								? "text-blue-500 w-full bg-gray-100 p-2 rounded-md flex gap-2 items-center"
								: "text-gray-700 w-full p-2 rounded-md flex gap-2 items-center hover:bg-gray-100 transition-colors duration-200"
						}
					>
						<IconHome size={20} />
						<Text size='sm'>All Notes</Text>
					</NavLink>
					<NavLink
						to='/archive'
						className={({ isActive }) =>
							isActive
								? "text-blue-500 w-full bg-gray-100 p-2 rounded-md flex gap-2 items-center"
								: "text-gray-700 w-full p-2 rounded-md flex gap-2 items-center hover:bg-gray-100 transition-colors duration-200"
						}
					>
						<IconArchive size={20} />
						<Text size='sm'>Archived Notes</Text>
					</NavLink>
				</div>
				<div>
					<Text size='sm' c='dimmed' my='sm' fw={500}>
						Tags
					</Text>
					<ScrollAreaAutosize
						style={{ height: "calc(100vh - 200px)" }}
						type='scroll'
						className='mt-2 flex flex-col gap-1'
					>
						{tagsWN.map((tag, index) => (
							<NavLink
								key={index}
								to={`/tags/${tag}`}
								className={({ isActive }) =>
									isActive
										? "text-blue-500 w-full bg-gray-100 p-2 rounded-md flex gap-2 items-center"
										: "text-gray-700 w-full p-2 rounded-md flex gap-2 items-center hover:bg-gray-100 transition-colors duration-200"
								}
							>
								<IconTag size={20} />
								<Text size='sm'>{tag}</Text>
							</NavLink>
						))}
					</ScrollAreaAutosize>
				</div>
			</nav>
			<section className='w-full '>
				<header className='p-4 w-full border-b border-gray-200 flex justify-between items-center'>
					<Text size='xl' fw={700}>
						{heading}
					</Text>
					<div className='flex gap-3 items-center'>
						<Search />
						<NavLink
							to='/settings'
							className={({ isActive }) =>
								isActive
									? "text-blue-500 bg-gray-100 p-2 rounded-md"
									: "text-gray-500 p-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
							}
						>
							<IconSettings size={20} />
						</NavLink>
					</div>
				</header>
				<Outlet />
			</section>
		</main>
	);
};

export default Desktop;
