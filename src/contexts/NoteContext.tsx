import { nanoid } from "nanoid";
import { createContext, useEffect, useState, type ReactNode } from "react";

type Note = {
	id: string | null;
	title: string | undefined;
	archived: boolean | false;
	content: string | undefined;
	tags: string[];
	date: string | number | Date | undefined;
};
type Tag = { id: string; label: string };
type AppContextType = {
	notes: Note[];
	archive: Note[];
	tags: Tag[];
	tagsWN: Tag[];
	heading: string;
	addNote: (note: Note) => void;
	archiveNote: (note: Note) => void;
	unArchiveNote: (note: Note) => void;
	editNote: (note: Note) => void;
	deleteNote: (id: string | null) => void;
	deleteArchive: (id: string | null) => void;
	getNote: (id: string | null) => Note | null | undefined;
	getNoteTag: (tag: string) => Note[] | null | undefined;
	getNoteArchive: (id: string | null) => Note | null | undefined;
	addTag: (tag: string) => void;
	editTag: (id: string, newLabel: string) => void;
	deleteTag: (tag: string) => void;
	setHeader: (text: string) => void;
	getTags: (gtags: string[]) => Tag[] | null;
	getTag: (id: string) => Tag | null | undefined;
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
	editTag: () => {},
	archiveNote: () => {},
	unArchiveNote: () => {},
	editNote: () => {},
	deleteNote: () => {},
	deleteArchive: () => {},
	addTag: () => {},
	deleteTag: () => {},
	getTags: () => null,
	getTag: () => null,
});

const AppProvider = ({ children }: { children: ReactNode }) => {
	const [notes, setNotes] = useState<Note[]>([]);
	const [archive, setArchive] = useState<Note[]>([]);
	const [tags, setTags] = useState<{ id: string; label: string }[]>([]);
	const [tagsWN, setTagsWN] = useState<{ id: string; label: string }[]>([]);
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
	const unArchiveNote = (note: Note) => {
		setNotes((prev) => [{ ...note, archived: false }, ...prev]);
		const others = archive.filter((n) => n.id !== note.id);
		setArchive([...others]);
	};
	const addTag = (tag: string) => {
		const t = {
			id: nanoid(7),
			label: tag,
		};
		setTags((prev) => [t, ...prev]);
	};
	const editTag = (id: string, newLabel: string) => {
		const prev = tags.filter((tag) => tag.id !== id);
		if (id) setTags([{ id, label: newLabel }, ...prev]);
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
		const deleted = tags.filter((t) => t.id !== tag);
		setTags(deleted);
	};
	const getTags = (gtags: string[]) => {
		const found: Tag[] = [];
		gtags.forEach((t) => {
			const f = tags.find((tg) => tg.id == t);
			if (f) found.push(f);
		});
		return found;
	};
	const getTag = (id: string) => {
		return tags.find((tag) => tag.id == id);
	};

	useEffect(() => {
		const found = tags.filter((tag) =>
			notes.some((note) => note.tags.includes(tag.id))
		);
		setTagsWN(found);
	}, [notes, tags]);

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
				unArchiveNote,
				getTags,
				getTag,
				editTag,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export default AppProvider;
export { AppContext };
export { type Note, type Tag };
