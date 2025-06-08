import { createContext, useState, type ReactNode } from "react";

type Note = {
	id: string | null;
	title: string | undefined;
	archived: boolean | false;
	content: string | undefined;
	tags: { label: string; id: string }[];
	date: string | number | Date | undefined;
};
type AppContextType = {
	notes: Note[];
	archive: Note[];
	tags: { label: string; id: string }[];
	addNote: (note: Note) => void;
	archiveNote: (note: Note) => void;
	editNote: (note: Note) => void;
	deleteNote: (id: string | null) => void;
	deleteArchive: (id: string | null) => void;
	getNote: (id: string | null) => Note | null | undefined;
	getNoteArchive: (id: string | null) => Note | null | undefined;
	addTag: (tag: { label: string; id: string }) => void;
	deleteTag: (tag: { label: string; id: string }) => void;
};

const AppContext = createContext<AppContextType>({
	notes: [],
	archive: [],
	tags: [],
	getNote: () => null,
	getNoteArchive: () => null,
	addNote: () => {},
	archiveNote: () => {},
	editNote: () => {},
	deleteNote: () => {},
	deleteArchive: () => {},
	addTag: () => {},
	deleteTag: () => {},
});
const AppProvider = ({ children }: { children: ReactNode }) => {
	const [notes, setNotes] = useState<Note[]>([]);
	const [archive, setArchive] = useState<Note[]>([]);
	const [tags, setTags] = useState<{ label: string; id: string }[] | []>([]);
	const addNote = (note: Note) => {
		setNotes((prev) => [note, ...prev]);
	};
	const editNote = (note: Note) => {
		const others = notes.filter((n) => n.id !== note.id);
		setNotes([note, ...others]);
	};
	const archiveNote = (note: Note) => {
		setArchive((prev) => [{ ...note, archived: true }, ...prev]);
		const others = notes.filter((n) => n.id !== note.id);
		setNotes([...others]);
	};
	const addTag = (tag: { label: string; id: string }) => {
		setTags((prev) => [tag, ...prev]);
	};
	const getNote = (id: string | null) => {
		const found = notes.find((note) => note.id == id);
		return found;
	};
	const getNoteArchive = (id: string | null) => {
		const found = archive.find((note) => note.id == id);
		return found;
	};
	const deleteNote = (id: string | null) => {
		const deleted = notes.filter((note) => note.id !== id);
		setNotes(deleted);
	};
	const deleteArchive = (id: string | null) => {
		const deleted = archive.filter((note) => note.id !== id);
		setNotes(deleted);
	};
	const deleteTag = (tag: { label: string; id: string }) => {
		const deleted = tags.filter((t) => t.id !== tag.id);
		setTags(deleted);
	};
	return (
		<AppContext.Provider
			value={{
				notes,
				addNote,
				getNote,
				deleteNote,
				tags,
				addTag,
				deleteTag,
				editNote,
				archiveNote,
				archive,
				getNoteArchive,
				deleteArchive,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export default AppProvider;
export { AppContext };
export { type Note };
