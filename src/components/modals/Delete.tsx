import { ActionIcon, Button, Group, Modal, Text } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { useContext } from "react";
import { AppContext, type Note } from "../../contexts/NoteContext";
import { useNavigate } from "react-router";

const Delete = ({
	note,
	mode,
	view,
}: {
	note: Note;
	mode?: string;
	view?: string;
}) => {
	const navigate = useNavigate();
	const { deleteNote, deleteArchive } = useContext(AppContext);
	const [opened, { open, close }] = useDisclosure(false);
	const deleteF = () => {
		deleteNote(note.id);
		navigate("/");
	};
	const deleteArchiveF = () => {
		deleteArchive(note.id);
		navigate("/archive");
	};

	return (
		<>
			{view !== "mobile" ? (
				<Button
					variant='outline'
					fullWidth
					color='red'
					leftSection={<IconTrash size={18} />}
					onClick={open}
				>
					Delete
				</Button>
			) : (
				<ActionIcon variant='outline' color='red' onClick={open}>
					<IconTrash size={14} />
				</ActionIcon>
			)}
			<Modal opened={opened} onClose={close} title='Archive Note'>
				<Text>
					Are you sure you want to delete <b>{note?.title} </b> note?. This
					action is irreversible
				</Text>
				<Group mt={14}>
					<Button onClick={close} color='black'>
						Cancel
					</Button>
					<Button
						onClick={() => {
							if (mode === "archive") {
								deleteArchiveF();
							}
							deleteF();
						}}
						color='red'
					>
						Delete
					</Button>
				</Group>
			</Modal>
		</>
	);
};

export default Delete;
