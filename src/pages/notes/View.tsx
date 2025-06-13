/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { Button, Text } from "@mantine/core";
import { IconHistory, IconPencil, IconTag } from "@tabler/icons-react";
import Archive from "../../components/modals/Archive";
import Delete from "../../components/modals/Delete";
import { useState, useContext, useEffect } from "react";
import { AppContext } from "../../contexts/NoteContext";
import TopMenu from "../../components/TopMenu";
import { useParams, Link } from "react-router";

const View = () => {
	const params = useParams();
	const noteId = params.noteId || null;
	const { getNote, getTag, loading } = useContext(AppContext);
	const [title, setTitle] = useState<string | undefined>("");
	const [ntags, setNTags] = useState<string[]>([]);
	const [content, setContent] = useState<string | undefined>("");
	const [date, setDate] = useState<string | number | Date>("");
	const [mNote, setMNote] = useState<any>(null);
	const getter = () => {
		const note = getNote(noteId);
		setMNote(note);
		const newContent = `
		<main style="font-family:sans-serif;">
		${note?.content}
		</main>
		`;
		setTitle(note?.title);
		setContent(newContent);
		setNTags(note?.tags ?? []);
		setDate(note?.updatedAt ? new Date(note.updatedAt) : "");
	};
	useEffect(() => {
		if (!loading) getter();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loading]);
	return (
		<section className='flex w-full'>
			<section className='flex flex-col gap-4 md:w-4/5 border-r p-3 border-gray-200 w-full'>
				<TopMenu note={mNote} mode='edit' />

				<>
					<header className='flex flex-col justify-center gap-3 border-b w-full border-gray-200 pb-4'>
						<div className='flex justify-between items-end'>
							<Text fw={700} fz={20}>
								{title}
							</Text>
							<Button
								to={`/notes/${noteId}/edit`}
								component={Link}
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
										key={tag}
										className='bg-gray-100 p-1 text-xs text-gray-500 rounded'
									>
										{getTag(tag)?.label}
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
				</>
			</section>
			<div className='hidden md:block space-y-4 p-3 w-full max-w-[12rem]'>
				<Archive note={mNote} />
				<Delete note={mNote} />
			</div>
		</section>
	);
};

export default View;
