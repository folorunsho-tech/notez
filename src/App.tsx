import { Button, Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { Link, NavLink } from "react-router";
import { nanoid } from "nanoid";
import { useContext } from "react";
import { AppContext } from "./contexts/NoteContext";
const Desktop = () => {
	const id = nanoid();
	const { notes, getTag } = useContext(AppContext);
	return (
		<main className='space-y-6 p-3'>
			<Button
				component={Link}
				to={`/notes/${id}/create`}
				radius='md'
				leftSection={<IconPlus size={12} />}
				className='md:float-end md:mr-5'
			>
				Create New Note
			</Button>
			<section className='w-full flex gap-4'>
				{notes.map((item) => (
					<NavLink
						key={item.id}
						end
						to={`/notes/${item.id}`}
						className={({ isActive }) =>
							isActive
								? "flex flex-col gap-1 p-2 w-64 bg-blue-100 text-blue-800 transition-colors duration-200"
								: "flex flex-col gap-1 p-2 w-64 bg-blue-100 hover:bg-gray-100 transition-colors duration-200"
						}
					>
						<span className='text-sm font-semibold text-wrap max-w-80'>
							{item.title}
						</span>
						<span className='text-xs text-gray-500'>
							{item.updatedAt
								? new Date(item.updatedAt).toLocaleDateString("en-US", {
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
									{getTag(tag)?.label}
								</span>
							))}
						</div>
					</NavLink>
				))}
				{notes?.length < 1 && (
					<Text className='text-center' fw={600} fz={24}>
						No notes..
					</Text>
				)}
			</section>
		</main>
	);
};

export default Desktop;
