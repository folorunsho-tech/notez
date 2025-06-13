import { ActionIcon, Button, Group, Modal, Text } from "@mantine/core";
import { IconArchiveOff } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { useContext } from "react";
import { AppContext, type Note } from "../../contexts/NoteContext";
import { useNavigate } from "react-router";

const UnArchive = ({ note, view }: { note: Note; view?: string }) => {
	const navigate = useNavigate();
	const { unArchiveNote } = useContext(AppContext);
	const [opened, { open, close }] = useDisclosure(false);
	const unArchive = () => {
		unArchiveNote(note);
		navigate("/");
	};
	return (
		<>
			{view !== "mobile" ? (
				<Button
					variant='outline'
					fullWidth
					color='yellow'
					leftSection={<IconArchiveOff size={18} />}
					onClick={open}
				>
					Unarchive
				</Button>
			) : (
				<ActionIcon variant='outline' color='yellow' onClick={open}>
					<IconArchiveOff size={18} />
				</ActionIcon>
			)}
			<Modal opened={opened} onClose={close} title='Remove note from archive'>
				<Text>
					Are you sure you want to remove <b>{note?.title} </b> note from
					archive?
				</Text>
				<Group mt={14}>
					<Button onClick={close} color='black'>
						Cancel
					</Button>
					<Button onClick={unArchive} color='yellow'>
						Unarchive
					</Button>
				</Group>
			</Modal>
		</>
	);
};

export default UnArchive;
