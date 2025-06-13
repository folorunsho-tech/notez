import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { AppContext, type Note } from "../../contexts/NoteContext";
import { Card } from "@mantine/core";

const SingleTag = () => {
	const [tagNotes, setTagNotes] = useState<Note[]>([]);
	const { getNoteTag, setHeader, getTag } = useContext(AppContext);
	const params = useParams();
	useEffect(() => {
		if (params.tag) {
			const notes = getNoteTag(params.tag);

			setTagNotes(notes ?? []);
		} else {
			setTagNotes([]);
		}
		if (params.tag) setHeader(`Tag -- ${getTag(params.tag)?.label}`);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [params.tag]);
	return (
		<main className='md:flex gap-3'>
			{tagNotes.map((item) => (
				<Card
					component={Link}
					to={`/notes/${item.id}`}
					key={item.id}
					shadow='sm'
					radius='md'
					withBorder
					w={200}
					className='space-y-2'
				>
					<span className='text-md font-semibold text-wrap max-w-80'>
						{item.title}
					</span>

					<div className='flex gap-1 flex-wrap'>
						{item.tags.map((tag, index) => (
							<span
								key={index}
								className='bg-blue-300 text-blue-600 text-xs px-2 py-1 rounded-sm'
							>
								{getTag(tag)?.label}
							</span>
						))}
					</div>
					<span className='text-xs text-gray-500'>
						{item.updatedAt
							? new Date(item.updatedAt).toLocaleDateString("en-US", {
									year: "numeric",
									month: "long",
									day: "numeric",
									hour: "2-digit",
									minute: "2-digit",
							  })
							: "No date"}
					</span>
				</Card>
			))}
		</main>
	);
};

export default SingleTag;
