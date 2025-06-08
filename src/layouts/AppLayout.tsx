import { useMediaQuery } from "@mantine/hooks";
import Desktop from "./Desktop";
import Mobile from "./Mobile";

const AppLayout = () => {
	const matches = useMediaQuery("(min-width: 56.25em)");
	if (matches) {
		return <Desktop />;
	}
	return <Mobile />;
};

export default AppLayout;
