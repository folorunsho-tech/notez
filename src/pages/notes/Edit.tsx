/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
	ActionIcon,
	Button,
	Group,
	Modal,
	Text,
	Tabs,
	MultiSelect,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
	IconHistory,
	IconTag,
	IconTagPlus,
	IconTags,
} from "@tabler/icons-react";
import { useState, useContext, useEffect } from "react";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Link, RichTextEditor, getTaskListExtension } from "@mantine/tiptap";
import { IconColorPicker } from "@tabler/icons-react";
import TaskItem from "@tiptap/extension-task-item";
import TipTapTaskList from "@tiptap/extension-task-list";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";
import { useNavigate, useParams } from "react-router";
import TagsManager from "../../components/TagsManager";
import Archive from "../../components/modals/Archive";
import Delete from "../../components/modals/Delete";
import { AppContext } from "../../contexts/NoteContext";
import TopMenu from "../../components/TopMenu";
import { getDBNote } from "../../lib/db";

const lowlight = createLowlight(common);

const Edit = () => {
	const params = useParams();
	const noteId = params.noteId || null;
	const navigate = useNavigate();
	const { tags, editNote, getTag } = useContext(AppContext);
	const [opened, { open, close }] = useDisclosure(false);
	const [title, setTitle] = useState<string | undefined>("");
	const [ntags, setNTags] = useState<string[]>([]);
	const [econtent, setContent] = useState<string | undefined>("");
	const [mNote, setMNote] = useState<any>(null);
	const [value, setValue] = useState<string[]>([]);

	const editor = useEditor({
		extensions: [
			StarterKit,
			Underline,
			Highlight,
			Link,
			TextStyle,
			Superscript,
			SubScript,
			TextAlign.configure({ types: ["heading", "paragraph"] }),
			Color,
			CodeBlockLowlight.configure({ lowlight }),
			getTaskListExtension(TipTapTaskList),
			TaskItem.configure({
				nested: true,
			}),
		],
		content: econtent,
	});
	const getter = async () => {
		const note = await getDBNote(noteId ?? "");

		setMNote(note);
		setTitle(note?.title);
		setContent(note?.content);
		setNTags(note?.tags ?? []);
		setValue(note?.tags ?? []);
	};
	useEffect(() => {
		getter();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	// Update editor content when econtent changes and editor is ready
	useEffect(() => {
		if (editor && econtent !== undefined) {
			editor.commands.setContent(econtent);
		}
	}, [editor, econtent]);
	const tagsList = tags.map((tag) => ({ label: tag.label, value: tag.id }));
	return (
		<section className='flex w-full'>
			<section className='flex flex-col p-3 pb-1 border-gray-200 md:w-4/5 w-full border-r '>
				<TopMenu
					note={{
						title: title ?? "",
						tags: ntags,
						content: editor?.getHTML() ?? "",
						id: noteId ?? "",
						archived: false,
						updatedAt: new Date(),
					}}
					mode='edit'
				/>
				<header className='flex flex-col justify-center gap-3 pb-4'>
					<div className='flex justify-between items-end text-xl font-bold'>
						<input
							placeholder='Note title'
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							className='w-full bg-transparent border-0 focus:ring-1 focus:outline-blue-500 text-gray-800'
						/>
					</div>
					<div className='flex justify-between items-center w-full'>
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
						<ActionIcon className='self-end' onClick={open}>
							<IconTagPlus size={16} />
						</ActionIcon>
					</div>
					<div className='flex gap-6 items-center'>
						<div className='flex items-center gap-2'>
							<IconHistory size={16} color='gray' />
							<Text fz={14} c='dimmed'>
								Last edited
							</Text>
						</div>
						<Text fz={13} c='dimmed'>
							{new Date().toLocaleDateString("en-US", {
								year: "numeric",
								month: "long",
								day: "numeric",
								hour: "2-digit",
								minute: "2-digit",
							})}
						</Text>
					</div>
				</header>

				<RichTextEditor
					editor={editor}
					variant='subtle'
					className='h-[30rem] overflow-y-auto mb-2'
				>
					<RichTextEditor.Toolbar
						sticky
						stickyOffset='var(--docs-header-height)'
					>
						<RichTextEditor.ControlsGroup>
							<RichTextEditor.Bold />
							<RichTextEditor.Italic />
							<RichTextEditor.Underline />
							<RichTextEditor.Strikethrough />
							<RichTextEditor.ClearFormatting />
							<RichTextEditor.Highlight />
						</RichTextEditor.ControlsGroup>

						<RichTextEditor.ControlsGroup>
							<RichTextEditor.H1 />
							<RichTextEditor.H2 />
							<RichTextEditor.H3 />
							<RichTextEditor.H4 />
							<RichTextEditor.H5 />
							<RichTextEditor.H6 />
						</RichTextEditor.ControlsGroup>

						<RichTextEditor.ControlsGroup>
							<RichTextEditor.Blockquote />
							<RichTextEditor.Hr />
							<RichTextEditor.BulletList />
							<RichTextEditor.OrderedList />
							<RichTextEditor.Subscript />
							<RichTextEditor.Superscript />
						</RichTextEditor.ControlsGroup>
						<RichTextEditor.ControlsGroup>
							<RichTextEditor.TaskList />
							<RichTextEditor.TaskListLift />
							<RichTextEditor.TaskListSink />
						</RichTextEditor.ControlsGroup>
						<RichTextEditor.ControlsGroup>
							<RichTextEditor.Link />
							<RichTextEditor.Unlink />
						</RichTextEditor.ControlsGroup>

						<RichTextEditor.ControlsGroup>
							<RichTextEditor.AlignLeft />
							<RichTextEditor.AlignCenter />
							<RichTextEditor.AlignJustify />
							<RichTextEditor.AlignRight />
						</RichTextEditor.ControlsGroup>
						<RichTextEditor.ControlsGroup>
							<RichTextEditor.CodeBlock />
						</RichTextEditor.ControlsGroup>
						<RichTextEditor.ControlsGroup>
							<RichTextEditor.Undo />
							<RichTextEditor.Redo />
						</RichTextEditor.ControlsGroup>
						<RichTextEditor.ColorPicker
							colors={[
								"#25262b",
								"#868e96",
								"#fa5252",
								"#e64980",
								"#be4bdb",
								"#7950f2",
								"#4c6ef5",
								"#228be6",
								"#15aabf",
								"#12b886",
								"#40c057",
								"#82c91e",
								"#fab005",
								"#fd7e14",
							]}
						/>
						<RichTextEditor.ControlsGroup>
							<RichTextEditor.Control interactive={false}>
								<IconColorPicker size={16} stroke={1.5} />
							</RichTextEditor.Control>
							<RichTextEditor.Color color='#F03E3E' />
							<RichTextEditor.Color color='#7048E8' />
							<RichTextEditor.Color color='#1098AD' />
							<RichTextEditor.Color color='#37B24D' />
							<RichTextEditor.Color color='#F59F00' />
						</RichTextEditor.ControlsGroup>

						<RichTextEditor.UnsetColor />
					</RichTextEditor.Toolbar>

					<RichTextEditor.Content />
				</RichTextEditor>
				<Group>
					<Button
						onClick={() => {
							const ncontent = editor?.getHTML();
							editNote({
								title: title ?? "",
								tags: ntags,
								content: ncontent ?? "",
								id: noteId ?? "",
								archived: false,
								updatedAt: new Date(),
							});
							navigate(`/notes/${noteId}`);
						}}
						disabled={!title}
					>
						Update Note
					</Button>
					<Button
						onClick={() => {
							navigate("/");
						}}
						color='black'
					>
						Cancel
					</Button>
				</Group>
				<Modal opened={opened} onClose={close} title='Add or Manage Tags'>
					<Tabs defaultValue='tags' keepMounted={false}>
						<Tabs.List>
							<Tabs.Tab value='tags' leftSection={<IconTagPlus size={14} />}>
								Add Tags
							</Tabs.Tab>
							<Tabs.Tab value='manager' leftSection={<IconTags size={14} />}>
								Tags Manager
							</Tabs.Tab>
						</Tabs.List>

						<Tabs.Panel value='tags'>
							<MultiSelect
								label='Add a tag'
								placeholder='Pick tag'
								data={tagsList}
								value={value}
								onChange={setValue}
								searchable
								nothingFoundMessage='Nothing found...'
								clearable
								hidePickedOptions
								className='my-4 mb-14'
							/>
							<Group>
								<Button
									onClick={() => {
										setNTags(value);
										close();
									}}
								>
									Update tag(s)
								</Button>
								<Button onClick={close} color='black'>
									Cancel
								</Button>
							</Group>
						</Tabs.Panel>

						<Tabs.Panel value='manager'>
							<TagsManager />
						</Tabs.Panel>
					</Tabs>
				</Modal>
			</section>
			<div className='hidden md:block space-y-4 p-3 w-full max-w-[12rem]'>
				<Archive note={mNote} />
				<Delete note={mNote} />
			</div>
		</section>
	);
};

export default Edit;
