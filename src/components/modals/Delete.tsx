import { Button, Group, Modal, Text } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { useContext } from "react";
import { AppContext, type Note } from "../../contexts/NoteContext";
import { useNavigate } from "react-router";

const Delete = ({ note, mode }: { note: Note; mode?: string }) => {
	const navigate = useNavigate();
	const { deleteNote } = useContext(AppContext);
	const [opened, { open, close }] = useDisclosure(false);
	const deleteF = () => {
		deleteNote(note.id);
		navigate("/");
	};
	const deleteArchive = () => {
		navigate("/");
	};
	return (
		<>
			<Button
				variant='outline'
				fullWidth
				color='red'
				leftSection={<IconTrash size={18} />}
				onClick={open}
			>
				Delete
			</Button>
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
						onClick={mode == "archive" ? deleteF : deleteArchive}
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
