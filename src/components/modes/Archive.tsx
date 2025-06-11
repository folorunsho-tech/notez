/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { Button, Text } from "@mantine/core";
import { IconArchive, IconHistory, IconTag } from "@tabler/icons-react";
import Delete from "../modals/Delete";
import { useState, useContext, useEffect } from "react";
import { AppContext, type Note, type Tag } from "../../contexts/NoteContext";
import TopMenu from "../TopMenu";
import UnArchive from "../modals/UnArchive";

const ArchiveV = ({
	noteId,
	mode,
}: {
	noteId: string | null;
	mode: string;
	setSearchParams?: (params: URLSearchParams) => void;
}) => {
	const { getNoteArchive, getTags } = useContext(AppContext);
	const [title, setTitle] = useState<string | undefined>("");
	const [ntags, setNTags] = useState<Tag[] | null>([]);
	const [content, setContent] = useState<string | undefined>("");
	const [date, setDate] = useState<string | number | Date>("");
	const [mNote, setMNote] = useState<any>();
	useEffect(() => {
		const note: Note | undefined = getNoteArchive(noteId) ?? undefined;
		const newContent = `
		<main style="font-family:sans-serif;">
		${note?.content}
		</main>
		`;
		setMNote(note);
		setTitle(note?.title);
		setContent(newContent);
		const tgs = note?.tags ? getTags(note?.tags) : [];
		setNTags(tgs);
		setDate(note?.date ? new Date(note.date) : "");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [noteId]);
	return (
		<section className='flex w-full'>
			<section className='flex flex-col gap-4 md:w-4/5 border-r p-3 border-gray-200 w-full'>
				<TopMenu note={mNote} mode='archive' />
				<header className='flex flex-col justify-center gap-3 border-b border-gray-200 pb-4'>
					<div className='flex justify-between items-end'>
						<Text fw={700} fz={20}>
							{title}
						</Text>
						<Button
							color='yellow'
							className='pointer-events-none'
							leftSection={<IconArchive size={16} />}
						>
							Archived
						</Button>
					</div>
					<div className='flex gap-6 items-center'>
						<div className='flex items-center gap-2'>
							<IconTag size={16} color='gray' />
							<Text fz={14} c='dimmed'>
								Tags
							</Text>
						</div>
						<div className='flex items-center gap-1'>
							{ntags?.map((tag, index) => (
								<span
									key={index}
									className='bg-gray-100 p-1 text-xs text-gray-500 rounded'
								>
									{tag.label}
								</span>
							))}
						</div>
					</div>
					<div className='flex gap-6 items-center'>
						<div className='flex items-center gap-2'>
							<IconHistory size={16} color='gray' />
							<Text fz={14} c='dimmed'>
								Last edited
							</Text>
						</div>
						<Text fz={13} c='dimmed'>
							{new Date(date).toLocaleDateString("en-US", {
								year: "numeric",
								month: "long",
								day: "numeric",
								hour: "2-digit",
								minute: "2-digit",
							})}
						</Text>
					</div>
				</header>
				<iframe srcDoc={content}></iframe>
			</section>
			<div className='space-y-4 p-3 w-full max-w-[12rem] hidden md:block'>
				<UnArchive note={mNote} />
				<Delete note={mNote} mode={mode} />
			</div>
		</section>
	);
};

export default ArchiveV;
