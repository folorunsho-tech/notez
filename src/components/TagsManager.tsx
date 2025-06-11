"use client";
import { Badge, Button, TextInput } from "@mantine/core";
import { IconTagPlus, IconX } from "@tabler/icons-react";
import { useState, useContext } from "react";
import { AppContext } from "../contexts/NoteContext";
const TagsManager = () => {
	const { tags, deleteTag, addTag } = useContext(AppContext);
	const [tag, setTag] = useState<string>("");
	return (
		<form
			className='p-2 space-y-6'
			onSubmit={(e) => {
				e.preventDefault();
				addTag(tag);
				setTag("");
			}}
		>
			<div className='flex gap-1 flex-wrap max-h-32 overflow-y-auto py-2 w-full'>
				{tags.map((tag, index) => (
					<Badge
						key={index}
						variant='outline'
						rightSection={
							<IconX
								color='red'
								cursor='pointer'
								size={14}
								onClick={() => {
									deleteTag(tag.id);
								}}
							/>
						}
					>
						{tag.label}
					</Badge>
				))}
			</div>
			<div className='flex gap-3 items-end-safe'>
				<TextInput
					placeholder='Tag name...'
					label='Tag Name'
					value={tag}
					onChange={(e) => {
						setTag(e.currentTarget.value);
					}}
				/>
				<Button size='xs' type='submit' leftSection={<IconTagPlus size={16} />}>
					Add tag
				</Button>
			</div>
		</form>
	);
};

export default TagsManager;
