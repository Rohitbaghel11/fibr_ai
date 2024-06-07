"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import TextBlock from "@/app/components/TextBlock";
import ImageBlock from "@/app/components/ImageBlock";

interface Props {
	id: string;
}

interface LandingPage {
	id: string;
	title: string;
	description: string;
	components: Array<any>;
}

const LandingPageForm: React.FC<Props> = ({ id }) => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [components, setComponents] = useState<Array<any>>([]);
	const [selectedComponents, setSelectedComponents] = useState<Set<string>>(
		new Set()
	);
	const router = useRouter();

	useEffect(() => {
		if (id !== "new") {
			const storedPages: LandingPage[] = JSON.parse(
				localStorage.getItem("landingPages") || "[]"
			);
			const page = storedPages.find(p => p.id === id);
			if (page) {
				setTitle(page.title);
				setDescription(page.description);
				setComponents(page.components);
				const initialSelectedComponents = new Set(
					page.components.map(component => component.type)
				);
				setSelectedComponents(initialSelectedComponents);
			}
		}
	}, [id]);

	const handleSave = () => {
		const storedPages: LandingPage[] = JSON.parse(
			localStorage.getItem("landingPages") || "[]"
		);
		const updatedPages =
			id === "new"
				? [
						...storedPages,
						{
							id: Date.now().toString(),
							title,
							description,
							components
						}
				  ]
				: storedPages.map(p =>
						p.id === id
							? { ...p, title, description, components }
							: p
				  );
		localStorage.setItem("landingPages", JSON.stringify(updatedPages));
		router.push("/");
	};

	const handlePreview = () => {
		const storedPages: LandingPage[] = JSON.parse(
			localStorage.getItem("landingPages") || "[]"
		);
		const updatedPages =
			id === "new"
				? [
						...storedPages,
						{
							id: Date.now().toString(),
							title,
							description,
							components
						}
				  ]
				: storedPages.map(p =>
						p.id === id
							? { ...p, title, description, components }
							: p
				  );
		localStorage.setItem("landingPages", JSON.stringify(updatedPages));
		router.push(
			`/dashboard/preview/${id === "new" ? Date.now().toString() : id}`
		);
	};

	const handleAddComponent = () => {
		const newComponents = Array.from(selectedComponents)
			.map(componentType => {
				switch (componentType) {
					case "Header":
						return {
							type: "Header",
							content: "New Header",
							logoUrl: "/path-to-logo.png",
							bgColor: "bg-blue-600",
							textColor: "text-white",
							fontSize: "text-3xl",
							textAlign: "center"
						};
					case "Footer":
						return { type: "Footer", content: "New Footer" };
					case "TextBlock":
						return { type: "TextBlock", content: "New Text Block" };
					case "ImageBlock":
						return {
							type: "ImageBlock",
							src: "https://images.pexels.com/photos/743986/pexels-photo-743986.jpeg",
							alt: "New Image"
						};
					default:
						return null;
				}
			})
			.filter(Boolean); // Filter out null values
		setComponents([...components, ...newComponents]);
		setSelectedComponents(new Set()); // Clear selection after adding components
	};

	const handleCheckboxChange = (componentType: string) => {
		setSelectedComponents(prevSelected => {
			const newSelected = new Set(prevSelected);
			if (newSelected.has(componentType)) {
				newSelected.delete(componentType);
				setComponents(prevComponents =>
					prevComponents.filter(
						component => component.type !== componentType
					)
				);
			} else {
				newSelected.add(componentType);
			}
			return newSelected;
		});
	};

	return (
		<div className='p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg'>
			<h2 className='text-3xl font-bold text-gray-800 mb-6'>
				Landing Page Form
			</h2>
			<input
				type='text'
				placeholder='Title'
				value={title}
				onChange={e => setTitle(e.target.value)}
				className='w-full p-3 border border-gray-300 rounded-md mb-4 text-black'
			/>
			<textarea
				placeholder='Description'
				value={description}
				onChange={e => setDescription(e.target.value)}
				className='w-full p-3 border border-gray-300 rounded-md mb-4 text-black'
				rows={4}
			></textarea>
			<div className='mb-4'>
				<div className='flex items-center mb-2'>
					<input
						type='checkbox'
						id='Header'
						value='Header'
						checked={selectedComponents.has("Header")}
						onChange={() => handleCheckboxChange("Header")}
						className='mr-2'
					/>
					<label htmlFor='Header' className='text-black'>
						Header
					</label>
				</div>
				<div className='flex items-center mb-2'>
					<input
						type='checkbox'
						id='Footer'
						value='Footer'
						checked={selectedComponents.has("Footer")}
						onChange={() => handleCheckboxChange("Footer")}
						className='mr-2'
					/>
					<label htmlFor='Footer' className='text-black'>
						Footer
					</label>
				</div>
				<div className='flex items-center mb-2'>
					<input
						type='checkbox'
						id='TextBlock'
						value='TextBlock'
						checked={selectedComponents.has("TextBlock")}
						onChange={() => handleCheckboxChange("TextBlock")}
						className='mr-2'
					/>
					<label htmlFor='TextBlock' className='text-black'>
						Text Block
					</label>
				</div>
				<div className='flex items-center mb-2'>
					<input
						type='checkbox'
						id='ImageBlock'
						value='ImageBlock'
						checked={selectedComponents.has("ImageBlock")}
						onChange={() => handleCheckboxChange("ImageBlock")}
						className='mr-2'
					/>
					<label htmlFor='ImageBlock' className='text-black'>
						Image
					</label>
				</div>
				<button
					onClick={handleAddComponent}
					className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200'
				>
					Add Selected Components
				</button>
			</div>
			<div className='mt-6 space-x-2'>
				<button
					onClick={handleSave}
					className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200'
				>
					Publish
				</button>
				<button
					onClick={handlePreview}
					className='bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-200'
				>
					Preview
				</button>
			</div>
		</div>
	);
};

export default LandingPageForm;
