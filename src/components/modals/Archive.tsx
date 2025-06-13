import { ActionIcon, Button, Group, Modal, Text } from "@mantine/core";
import { IconArchive } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { useContext } from "react";
import { AppContext, type Note } from "../../contexts/NoteContext";
import { useNavigate } from "react-router";

const Archive = ({ note, view }: { note: Note | null; view?: string }) => {
	const navigate = useNavigate();
	const { archiveNote } = useContext(AppContext);
	const [opened, { open, close }] = useDisclosure(false);
	const archive = () => {
		if (note) {
			archiveNote(note);
			navigate("/");
		}
	};
	return (
		<>
			{view !== "mobile" ? (
				<Button
					variant='outline'
					fullWidth
					color='yellow'
					leftSection={<IconArchive size={18} />}
					onClick={open}
				>
					Archive
				</Button>
			) : (
				<ActionIcon variant='outline' color='yellow' onClick={open}>
					<IconArchive size={18} />
				</ActionIcon>
			)}
			<Modal opened={opened} onClose={close} title='Archive Note'>
				<Text>
					Are you sure you want to Archive <b>{note?.title} </b> note?
				</Text>
				<Group mt={14}>
					<Button onClick={close} color='black'>
						Cancel
					</Button>
					<Button onClick={archive} color='yellow'>
						Archive
					</Button>
				</Group>
			</Modal>
		</>
	);
};

export default Archive;
