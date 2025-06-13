/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { NavLink, Outlet, useLocation } from "react-router";
import { useContext, useEffect } from "react";
import { AppContext } from "../../contexts/NoteContext";
function Archive() {
	const { archive, setHeader, getTag } = useContext(AppContext);
	const location = useLocation();
	useEffect(() => {
		if (location.pathname === "/archive") setHeader("Archived Notes");
	}, [location]);
	return (
		<main className='flex h-full w-full'>
			<div className='md:flex flex-col gap-2 overflow-y-auto h-full p-3 w-64 border-r hidden border-gray-200'>
				{archive.map((item) => (
					<NavLink
						key={item.id}
						end
						to={`/archive/${item.id}`}
						className={({ isActive }) =>
							isActive
								? "flex flex-col gap-1 p-2 bg-blue-100 text-blue-800 transition-colors duration-200"
								: "flex flex-col gap-1 p-2 hover:bg-gray-100 transition-colors duration-200"
						}
					>
						<span className='text-sm font-semibold text-wrap max-w-80'>
							{item.title}
						</span>
						<span className='text-xs text-gray-500'>
							{item.updatedAt
								? new Date(item.updatedAt).toLocaleDateString("en-US", {
										year: "numeric",
										month: "long",
										day: "numeric",
										hour: "2-digit",
										minute: "2-digit",
								  })
								: "No date"}
						</span>
						<div className='flex gap-1 flex-wrap'>
							{item.tags.map((tag, index) => (
								<span
									key={index}
									className='bg-blue-200 text-blue-800 text-xs px-2 py-1 rounded-full'
								>
									{getTag(tag)?.label}
								</span>
							))}
						</div>
					</NavLink>
				))}
			</div>
			<Outlet />
		</main>
	);
}

export default Archive;
