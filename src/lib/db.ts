import { openDB, type DBSchema, type IDBPDatabase } from "idb";

interface Note {
	id: string;
	title: string;
	archived: boolean | false;
	content: string;
	tags: string[];
	updatedAt: string | number | Date;
	createdAt?: string | number | Date;
}
interface Tag {
	id: string;
	label: string;
}

interface NotesDB extends DBSchema {
	notes: {
		key: string;
		value: Note;
		indexes: {
			"by-updatedAt": string | number | Date;
			"by-title": string;
		};
	};
	tags: {
		key: string;
		value: Tag;
	};
}

let dbPromise: Promise<IDBPDatabase<NotesDB>> | null = null;

function getDB() {
	if (!dbPromise) {
		dbPromise = openDB<NotesDB>("notes-db", 1, {
			upgrade(db) {
				const store = db.createObjectStore("notes", { keyPath: "id" });
				db.createObjectStore("tags", { keyPath: "id" });
				store.createIndex("by-updatedAt", "updatedAt");
				store.createIndex("by-title", "title");
			},
		});
	}
	return dbPromise;
}

export async function getAllDBNotes(): Promise<Note[]> {
	const db = await getDB();
	return db.getAll("notes");
}
export async function getAllDBTags(): Promise<Tag[]> {
	const db = await getDB();
	return db.getAll("tags");
}
export async function addDBNote(note: Note) {
	const db = await getDB();
	await db.put("notes", note);
	return await getAllDBNotes();
}
export async function addDBTag(tag: Tag) {
	const db = await getDB();
	await db.put("tags", tag);
	return await getAllDBTags();
}

export async function getDBNote(id: string): Promise<Note | undefined> {
	const db = await getDB();
	const found = await db.get("notes", id);
	return found;
}

export async function updateDBNote(id: string, updates: Partial<Note>) {
	const db = await getDB();
	const note = await db.get("notes", id);
	if (!note) return;
	const updatedNote = { ...note, ...updates, updatedAt: Date.now() };
	await db.put("notes", updatedNote);
	return await getAllDBNotes();
}
export async function updateDBTag(id: string, updates: Partial<Tag>) {
	const db = await getDB();
	const tag = await db.get("tags", id);
	if (!tag) return;
	const updatedTag = { ...tag, ...updates };
	await db.put("tags", updatedTag);
	return await getAllDBTags();
}

export async function deleteDBNote(id: string) {
	const db = await getDB();
	await db.delete("notes", id);
	return await getAllDBNotes();
}

export async function deleteDBTag(id: string) {
	const db = await getDB();
	await db.delete("tags", id);
	return await getAllDBTags();
}
