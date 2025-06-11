import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "@mantine/core/styles.css";
import "@mantine/tiptap/styles.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { MantineProvider } from "@mantine/core";
import AppLayout from "./layouts/AppLayout.tsx";
import Tags from "./pages/tags/Tags.tsx";
import Search from "./pages/search/Search.tsx";
import Settings from "./pages/settings/Settings.tsx";
import Archived from "./pages/archive/Archived.tsx";
import SingleTag from "./pages/tags/SingleTag.tsx";
import SingleNote from "./pages/notes/SingleNote.tsx";
import AppProvider from "./contexts/NoteContext.tsx";
import Page from "./pages/archive/Page.tsx";
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<AppProvider>
			<MantineProvider>
				<BrowserRouter>
					<Routes>
						<Route element={<AppLayout />}>
							<Route path='/' element={<App />}>
								<Route path='/notes/:noteId' element={<SingleNote />} />
							</Route>
							<Route path='/m/notes/:noteId' element={<SingleNote />} />
							<Route path='/tags' element={<Tags />}>
								<Route path=':tag' element={<SingleTag />} />
							</Route>
							<Route path='/archive' element={<Archived />}>
								<Route path='/archive/:noteId' element={<SingleNote />} />
							</Route>
							<Route path='/m/archive' element={<Page />} />
							<Route path='/search' element={<Search />} />
							<Route path='/settings' element={<Settings />} />
						</Route>
					</Routes>
				</BrowserRouter>
			</MantineProvider>
		</AppProvider>
	</StrictMode>
);
