"use client"; // Add this line at the top

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import withAuth from "../../../components/withAuth";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import TextBlock from "../../../components/TextBlock";
import ImageBlock from "../../../components/ImageBlock";

interface LandingPage {
	id: string;
	title: string;
	description: string;
	components: Array<any>;
}

const LandingPagePreview: React.FC = () => {
	const { id } = useParams();
	const [page, setPage] = useState<LandingPage | null>(null);

	useEffect(() => {
		const storedPages: LandingPage[] = JSON.parse(
			localStorage.getItem("landingPages") || "[]"
		);
		const page = storedPages.find(p => p.id === id);
		if (page) {
			setPage(page);
		}
	}, [id]);

	const renderComponent = (component: any, index: number) => {
		switch (component.type) {
			case "Header":
				return <Header key={index} content={component.content} />;
			case "Footer":
				return <Footer key={index} content={component.content} />;
			case "TextBlock":
				return <TextBlock key={index} content={component.content} />;
			case "ImageBlock":
				return (
					<ImageBlock
						key={index}
						src={component.src}
						alt={component.alt}
					/>
				);
			default:
				return null;
		}
	};

	if (!page)
		return (
			<div className='flex items-center justify-center min-h-screen bg-gray-100'>
				Loading...
			</div>
		);

	const componentsInOrder = [
		page.components.find(component => component.type === "Header"),
		{ type: "Heading", content: page.title },
		page.components.find(component => component.type === "ImageBlock"),
		page.components.find(component => component.type === "TextBlock"),
		{ type: "Description", content: page.description },
		page.components.find(component => component.type === "Footer")
	];

	return (
		<div className='min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 p-6 flex flex-col items-center justify-center'>
			<div className='w-full max-w-6xl bg-white shadow-lg rounded-lg p-8 flex flex-col justify-center items-center space-y-6'>
				{componentsInOrder.map((component, index) => {
					if (component?.type === "Heading") {
						return (
							<h1
								key={index}
								className='text-5xl font-bold text-gray-900 text-center'
							>
								{component.content}
							</h1>
						);
					} else if (component?.type === "Description") {
						return (
							<p
								key={index}
								className='text-lg text-gray-700 text-center'
							>
								{component.content}
							</p>
						);
					} else if (component) {
						return (
							<div key={index} className='w-full'>
								{renderComponent(component, index)}
							</div>
						);
					} else {
						return null;
					}
				})}
			</div>
		</div>
	);
};

export default withAuth(LandingPagePreview);
