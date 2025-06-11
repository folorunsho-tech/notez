import { Button } from "@mantine/core";
import { type Note } from "../contexts/NoteContext";
import { Link } from "react-router";
import { IconCaretLeft } from "@tabler/icons-react";
import Delete from "./modals/Delete";
import Archive from "./modals/Archive";
import UnArchive from "./modals/UnArchive";

const TopMenu = ({ note, mode }: { note: Note; mode?: string }) => {
	return (
		<nav className='flex items-center justify-between border-b border-gray-300 py-3 mb-2 md:hidden'>
			<Button
				component={Link}
				to='/'
				leftSection={<IconCaretLeft size={16} />}
				variant='subtle'
				size='compact-sm'
			>
				Go Back
			</Button>

			<div className='flex gap-4 items-center'>
				<Delete note={note} view='mobile' />
				{mode == "edit" && <Archive note={note} view='mobile' />}
				{mode == "archive" && <UnArchive note={note} view='mobile' />}
			</div>
		</nav>
	);
};

export default TopMenu;
