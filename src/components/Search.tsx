import { Combobox, InputBase, useCombobox } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useContext, useState } from "react";
import { Link } from "react-router";
import { AppContext, type Note } from "../contexts/NoteContext";
const Search = () => {
	const { notes } = useContext(AppContext);

	const [search, setSearch] = useState("");

	const combobox = useCombobox({
		onDropdownClose: () => combobox.resetSelectedOption(),
	});
	const filtered = notes.filter((note: Note) => {
		const searchLower = search.toLowerCase();
		return (
			note?.title?.toLowerCase().includes(searchLower) ||
			note?.tags.some((tag) => tag.toLowerCase().includes(searchLower)) ||
			(note?.date &&
				new Date(note?.date).toLocaleDateString().includes(searchLower))
		);
	});

	const Soptions = filtered.map((item) => (
		<Combobox.Option value={item.id ?? ""} key={item.id ?? ""}>
			<Link
				to={`/notes/${item.id}?mode=view`}
				className='flex flex-col gap-1 p-2 hover:bg-gray-100 transition-colors duration-200'
			>
				<span className='text-sm font-semibold'>{item.title}</span>
				<span className='text-xs text-gray-500'>
					{item.date ? new Date(item.date).toLocaleDateString() : "No date"}
				</span>
				<div className='flex gap-1 flex-wrap'>
					{item.tags.map((tag) => (
						<span
							key={tag}
							className='bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full'
						>
							{tag}
						</span>
					))}
				</div>
			</Link>
		</Combobox.Option>
	));
	return (
		<Combobox
			store={combobox}
			withinPortal={false}
			onOptionSubmit={(val) => {
				setSearch(val);
				combobox.closeDropdown();
				setSearch("");
			}}
		>
			<Combobox.Target>
				<InputBase
					value={search}
					onChange={(event) => {
						combobox.openDropdown();
						combobox.updateSelectedOptionIndex();
						setSearch(event.currentTarget.value);
					}}
					onClick={() => combobox.openDropdown()}
					onFocus={() => combobox.openDropdown()}
					onBlur={() => {
						combobox.closeDropdown();
					}}
					placeholder='Search by title, content, or tags...'
					className='w-64'
					radius='md'
					leftSection={<IconSearch size={16} />}
				/>
			</Combobox.Target>

			<Combobox.Dropdown>
				<Combobox.Options>
					{Soptions.length > 0 ? (
						Soptions
					) : (
						<Combobox.Empty>Nothing found</Combobox.Empty>
					)}
				</Combobox.Options>
			</Combobox.Dropdown>
		</Combobox>
	);
};

export default Search;
