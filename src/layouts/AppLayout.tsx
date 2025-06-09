import { useMediaQuery } from "@mantine/hooks";
import Desktop from "./Desktop";
import Mobile from "./Mobile";

const AppLayout = () => {
	const matches = useMediaQuery("(min-width: 49rem)");
	if (matches) {
		return <Desktop />;
	}
	return <Mobile />;
};

export default AppLayout;
