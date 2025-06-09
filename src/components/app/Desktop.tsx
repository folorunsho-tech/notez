import { Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { Link, NavLink, Outlet } from "react-router";
import { nanoid } from "nanoid";
import { useContext } from "react";
import { AppContext } from "../../contexts/NoteContext";
const Desktop = () => {
	const id = nanoid();
	const { notes } = useContext(AppContext);
	return (
		<main className='hidden md:flex h-full'>
			<section className='p-4 md:w-54 bg-gray-50 border-r border-gray-200'>
				<Button
					component={Link}
					to={`/notes/${id}?mode=create`}
					fullWidth
					radius='md'
					leftSection={<IconPlus size={12} />}
				>
					Create New Note
				</Button>
				<div className='mt-4 flex flex-col gap-2 overflow-y-auto h-full'>
					{notes.map((item) => (
						<NavLink
							key={item.id}
							end
							to={`/notes/${item.id}?mode=view`}
							className={({ isActive }) =>
								isActive
									? "flex flex-col gap-1 p-2 bg-blue-100 text-blue-800 transition-colors duration-200"
									: "flex flex-col gap-1 p-2 hover:bg-gray-100 transition-colors duration-200"
							}
						>
							<span className='text-sm font-semibold text-wrap max-w-80'>
								{item.title}
							</span>
							<span className='text-xs text-gray-500'>
								{item.date
									? new Date(item.date).toLocaleDateString("en-US", {
											year: "numeric",
											month: "long",
											day: "numeric",
											hour: "2-digit",
											minute: "2-digit",
									  })
									: "No date"}
							</span>
							<div className='flex gap-1 flex-wrap'>
								{item.tags.map((tag, index) => (
									<span
										key={index}
										className='bg-blue-200 text-blue-800 text-xs px-2 py-1 rounded-full'
									>
										{tag}
									</span>
								))}
							</div>
						</NavLink>
					))}
				</div>
			</section>
			<Outlet />
		</main>
	);
};

export default Desktop;
