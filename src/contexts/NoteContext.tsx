import { nanoid } from "nanoid";
import { createContext, useEffect, useState, type ReactNode } from "react";
import {
	addDBNote,
	addDBTag,
	deleteDBNote,
	deleteDBTag,
	getAllDBNotes,
	getAllDBTags,
	updateDBNote,
	updateDBTag,
} from "../lib/db";

type Note = {
	id: string;
	title: string;
	archived: boolean | false;
	content: string;
	tags: string[];
	updatedAt: string | number | Date;
	createdAt?: string | number | Date;
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
	getNote: (id: string | null) => Note | null;
	getNoteTag: (tag: string) => Note[] | null | undefined;
	getNoteArchive: (id: string) => Note | null | undefined;
	addTag: (tag: string) => void;
	editTag: (id: string, newLabel: string) => void;
	deleteTag: (tag: string) => void;
	setHeader: (text: string) => void;
	getTags: (gtags: string[]) => Tag[] | null;
	getTag: (id: string) => Tag | null | undefined;
	loading: boolean;
};

const AppContext = createContext<AppContextType>({
	notes: [],
	archive: [],
	tags: [],
	tagsWN: [],
	heading: "All Notes",
	loading: false,
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
	const [allNotes, setAllNotes] = useState<Note[]>([]);
	const [notes, setNotes] = useState<Note[]>([]);
	const [archive, setArchive] = useState<Note[]>([]);
	const [tags, setTags] = useState<{ id: string; label: string }[]>([]);
	const [tagsWN, setTagsWN] = useState<{ id: string; label: string }[]>([]);
	const [heading, setHeading] = useState<string>("All Notes");
	const [loading, setLoading] = useState<boolean>(false);
	const addNote = async (note: Note) => {
		const notes = await addDBNote(note);
		setAllNotes(notes);
	};
	const setHeader = (text: string) => {
		setHeading(text);
	};
	const editNote = async (note: Note) => {
		const n = await updateDBNote(note.id, note);
		setAllNotes(n ?? notes);
	};
	const archiveNote = async (note: Note) => {
		const update = { ...note, archived: true };
		const n = await updateDBNote(update.id, update);
		setAllNotes(n ?? notes);
	};
	const unArchiveNote = async (note: Note) => {
		const update = { ...note, archived: false };
		const n = await updateDBNote(update.id, update);
		setAllNotes(n ?? notes);
	};
	const addTag = async (tag: string) => {
		const t = {
			id: nanoid(7),
			label: tag,
		};
		const tg = await addDBTag(t);
		setTags(tg);
	};
	const editTag = async (id: string, newLabel: string) => {
		const t = await updateDBTag(id, { id, label: newLabel });
		setTags(t ?? tags);
	};
	const getNote = (id: string | null) => {
		const found = allNotes.find((note) => note.id == id) ?? null;
		return found;
	};
	const getNoteTag = (tag: string) =>
		allNotes.filter((note) => note.tags.includes(tag));
	const getNoteArchive = (id: string) => {
		const found = allNotes.find((note) => note.id == id);
		return found;
	};
	const deleteNote = async (id: string | null) => {
		if (id) {
			const deleted = await deleteDBNote(id);
			setAllNotes(deleted);
		}
	};
	const deleteArchive = async (id: string | null) => {
		if (id) {
			const deleted = await deleteDBNote(id);
			setAllNotes(deleted);
		}
	};
	const deleteTag = async (tag: string) => {
		const deleted = await deleteDBTag(tag);
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
	const fetchNotes = async () => {
		setLoading(true);
		const allNotes = await getAllDBNotes();
		setAllNotes(allNotes);
		setLoading(false);
	};
	const fetchTags = async () => {
		setLoading(true);
		const tags = await getAllDBTags();
		setTags(tags);
		setLoading(false);
	};
	useEffect(() => {
		fetchNotes();
		fetchTags();
	}, []);
	useEffect(() => {
		const nNotes = allNotes.filter((note) => note.archived == false);
		const aNotes = allNotes.filter((note) => note.archived == true);
		setNotes(nNotes);
		setArchive(aNotes);
	}, [allNotes]);

	return (
		<AppContext.Provider
			value={{
				notes,
				addNote,
				getNote,
				deleteNote,
				loading,
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
