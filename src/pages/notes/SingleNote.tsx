"use client";
import { useParams, useSearchParams } from "react-router";
import View from "../../components/modes/View";
import Edit from "../../components/modes/Edit";
import Create from "../../components/modes/Create";
import ArchiveV from "../../components/modes/Archive";

const SingleNote = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const params = useParams();
	const mode = searchParams.get("mode");
	const id = params.noteId || null; // Use params.id if available, otherwise null
	if (mode === "view" || mode === null) {
		return <View noteId={id} setSearchParams={setSearchParams} />;
	} else if (mode === "edit") {
		return <Edit noteId={id} setSearchParams={setSearchParams} />; // Pass setSearchParams to Edit component
	} else if (mode === "archive") {
		return <ArchiveV noteId={id} />;
	} else if (mode === "create") {
		return <Create noteId={id} setSearchParams={setSearchParams} />;
	}
	return <View noteId={id} setSearchParams={setSearchParams} />;
};

export default SingleNote;
