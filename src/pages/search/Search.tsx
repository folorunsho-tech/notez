import { IconSearch } from "@tabler/icons-react";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { AppContext, type Note } from "../../contexts/NoteContext";
import { TextInput } from "@mantine/core";

const Search = () => {
	const { notes, getTags, getTag, setHeader } = useContext(AppContext);

	const [search, setSearch] = useState("");
	const filtered = notes.filter((note: Note) => {
		const searchLower = search.toLowerCase();
		return (
			note?.title?.toLowerCase().includes(searchLower) ||
			getTags(note?.tags)?.some((tag) =>
				tag.label.toLowerCase().includes(searchLower)
			) ||
			(note?.date &&
				new Date(note?.date).toLocaleDateString().includes(searchLower))
		);
	});
	const location = useLocation();
	useEffect(() => {
		if (location.pathname == "/search") setHeader("Search");
	}, [location]);
	const Soptions = filtered.map((item) => (
		<Link
			key={item.id}
			to={`/notes/${item.id}?mode=view`}
			className='flex shadow-sm w-40 flex-col gap-1 p-2 hover:bg-gray-100 transition-colors duration-200'
		>
			<span className='text-sm font-semibold'>{item.title}</span>
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
				{item.tags.map((tag) => (
					<span
						key={tag}
						className='bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full'
					>
						{getTag(tag)?.label}
					</span>
				))}
			</div>
		</Link>
	));
	return (
		<main className='space-y-6 p-3'>
			<TextInput
				value={search}
				onChange={(event) => {
					setSearch(event.currentTarget.value);
				}}
				placeholder='Search by title, content, or tags...'
				className='w-full'
				radius='md'
				leftSection={<IconSearch size={16} />}
			/>
			<section className='flex flex-wrap w-full gap-3'>{Soptions}</section>
		</main>
	);
};

export default Search;
