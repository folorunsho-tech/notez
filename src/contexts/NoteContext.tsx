import { createContext, useEffect, useState, type ReactNode } from "react";

type Note = {
	id: string | null;
	title: string | undefined;
	archived: boolean | false;
	content: string | undefined;
	tags: string[];
	date: string | number | Date | undefined;
};
type AppContextType = {
	notes: Note[];
	archive: Note[];
	tags: string[];
	tagsWN: string[];
	heading: string;
	addNote: (note: Note) => void;
	archiveNote: (note: Note) => void;
	editNote: (note: Note) => void;
	deleteNote: (id: string | null) => void;
	deleteArchive: (id: string | null) => void;
	getNote: (id: string | null) => Note | null | undefined;
	getNoteTag: (tag: string) => Note[] | null | undefined;
	getNoteArchive: (id: string | null) => Note | null | undefined;
	addTag: (tag: string) => void;
	deleteTag: (tag: string) => void;
	setHeader: (text: string) => void;
};

const AppContext = createContext<AppContextType>({
	notes: [],
	archive: [],
	tags: [],
	tagsWN: [],
	heading: "All Notes",
	setHeader: () => null,
	getNote: () => null,
	getNoteTag: () => null,
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
	const [tags, setTags] = useState<string[] | []>([]);
	const [tagsWN, settagsWN] = useState<string[] | []>([]);
	const [heading, setHeading] = useState<string>("All Notes");
	const addNote = (note: Note) => {
		setNotes((prev) => [note, ...prev]);
	};
	const setHeader = (text: string) => {
		setHeading(text);
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
	const addTag = (tag: string) => {
		setTags((prev) => [tag, ...prev]);
	};
	const getNote = (id: string | null) => {
		const found = notes.find((note) => note.id == id);
		return found;
	};
	const getNoteTag = (tag: string) =>
		notes.filter((note) => note.tags.includes(tag));
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
	const deleteTag = (tag: string) => {
		const deleted = tags.filter((t) => t !== tag);
		setTags(deleted);
	};

	useEffect(() => {
		const tagswn: { [tag: string]: Note[] } = notes.reduce((acc, note) => {
			note.tags.forEach((tag) => {
				if (!acc[tag]) acc[tag] = [];
				acc[tag].push(note);
			});
			return acc;
		}, {} as { [tag: string]: Note[] });
		settagsWN(Object.keys(tagswn));
	}, [notes]);

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
				getNoteTag,
				tagsWN,
				heading,
				setHeader,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export default AppProvider;
export { AppContext };
export { type Note };
