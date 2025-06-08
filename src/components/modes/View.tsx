/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { Button, Text } from "@mantine/core";
import { IconHistory, IconPencil, IconTag } from "@tabler/icons-react";
import Archive from "../modals/Archive";
import Delete from "../modals/Delete";
import { useState, useContext, useEffect } from "react";
import { AppContext, type Note } from "../../contexts/NoteContext";

const View = ({
	noteId,
	setSearchParams,
}: {
	noteId: string | null;
	setSearchParams: (params: URLSearchParams) => void;
}) => {
	const { getNote } = useContext(AppContext);
	const [title, setTitle] = useState<string | undefined>("");
	const [ntags, setNTags] = useState<{ label: string; id: string }[]>([]);
	const [content, setContent] = useState<string | undefined>("");
	const [date, setDate] = useState<string | number | Date>("");
	const [mNote, setMNote] = useState<any>();
	useEffect(() => {
		const note: Note | undefined = getNote(noteId) ?? undefined;
		setMNote(note);
		setTitle(note?.title);
		setContent(note?.content);
		setNTags(note?.tags ?? []);
		setDate(note?.date ? new Date(note.date) : "");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [noteId]);
	return (
		<section className='flex w-full'>
			<section className='flex flex-col gap-4 w-4/5 border-r p-3 border-gray-200'>
				<header className='flex flex-col justify-center gap-3 border-b border-gray-200 pb-4'>
					<div className='flex justify-between items-end'>
						<Text fw={700} fz={20}>
							{title}
						</Text>
						<Button
							onClick={() => {
								setSearchParams(new URLSearchParams("?mode=edit"));
							}}
							leftSection={<IconPencil size={16} />}
						>
							Edit Note
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
							{ntags.map((tag) => (
								<span
									key={tag.id}
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
			<div className='space-y-4 p-3 w-full max-w-[12rem]'>
				<Archive note={mNote} />
				<Delete note={mNote} />
			</div>
		</section>
	);
};

export default View;
