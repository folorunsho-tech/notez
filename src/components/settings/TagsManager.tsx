"use client";
import { Badge, Button, TextInput } from "@mantine/core";
import { IconEdit, IconPencil, IconTagPlus, IconX } from "@tabler/icons-react";
import { useState, useContext } from "react";
import { AppContext } from "../../contexts/NoteContext";
const TagsManager = () => {
	const { tags, deleteTag, addTag, editTag } = useContext(AppContext);
	const [tag, setTag] = useState<string>("");
	const [id, setId] = useState<string>("");
	const [mode, setMode] = useState<string>("add");
	const add = () => {
		addTag(tag);
		setTag("");
	};
	const edit = () => {
		editTag(id, tag);
		setTag("");
		setMode("add");
	};
	return (
		<form
			className='p-4 space-y-6'
			onSubmit={(e) => {
				e.preventDefault();
			}}
		>
			<div className='flex gap-3 items-end-safe'>
				<TextInput
					placeholder='name...'
					label='Tag Name'
					value={tag}
					onChange={(e) => {
						setTag(e.currentTarget.value);
					}}
				/>
				{mode == "add" ? (
					<Button
						size='xs'
						type='submit'
						onClick={add}
						leftSection={<IconTagPlus size={16} />}
					>
						Add tag
					</Button>
				) : (
					<Button
						size='xs'
						color='teal'
						type='submit'
						onClick={edit}
						leftSection={<IconEdit size={16} />}
					>
						Edit tag
					</Button>
				)}
			</div>
			<div className='flex gap-1 flex-wrap max-h-32 overflow-y-auto py-2 w-full'>
				{tags.map((t, index) => (
					<Badge
						key={index}
						variant='outline'
						rightSection={
							<div className='flex gap-3 items-baseline'>
								<IconPencil
									color='teal'
									cursor='pointer'
									size={14}
									onClick={() => {
										setId(t.id);
										setTag(t.label);
										setMode("edit");
									}}
								/>
								<IconX
									color='red'
									cursor='pointer'
									size={14}
									onClick={() => {
										deleteTag(t.id);
									}}
								/>
							</div>
						}
					>
						{t.label}
					</Badge>
				))}
			</div>
		</form>
	);
};

export default TagsManager;
