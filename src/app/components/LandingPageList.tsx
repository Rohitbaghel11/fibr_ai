"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface LandingPage {
	id: string;
	title: string;
	description: string;
	components: Array<any>;
}

const LandingPageList: React.FC = () => {
	const [pages, setPages] = useState<LandingPage[]>([]);
	const router = useRouter();

	useEffect(() => {
		const storedPages = JSON.parse(
			localStorage.getItem("landingPages") || "[]"
		);
		setPages(storedPages);
	}, []);

	const handleDelete = (id: string) => {
		const updatedPages = pages.filter(page => page.id !== id);
		setPages(updatedPages);
		localStorage.setItem("landingPages", JSON.stringify(updatedPages));
	};

	return (
		<div className='p-4 max-w-4xl mx-auto'>
			<div className='flex justify-between items-center mb-6'>
				<h2 className='text-3xl font-bold text-gray-800'>
					Landing Pages
				</h2>
				<button
					onClick={() => router.push("/dashboard/new")}
					className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200'
				>
					Create New Page
				</button>
			</div>
			<ul className='space-y-4'>
				{pages.map(page => (
					<li
						key={page.id}
						className='flex items-center justify-between p-4 bg-white shadow-md rounded-lg border hover:bg-gray-100 transition duration-200'
					>
						<div>
							<h3 className='text-xl font-semibold text-gray-700'>
								{page.title}
							</h3>
							<p className='text-gray-600'>{page.description}</p>
						</div>
						<div className='space-x-2'>
							<button
								onClick={() =>
									router.push(`/dashboard/${page.id}`)
								}
								className='bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition duration-200'
							>
								Edit
							</button>
							<button
								onClick={() =>
									router.push(`/dashboard/preview/${page.id}`)
								}
								className='bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200'
							>
								View
							</button>
							<button
								onClick={() => handleDelete(page.id)}
								className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200'
							>
								Delete
							</button>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default LandingPageList;
