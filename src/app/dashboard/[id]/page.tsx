"use client";
import LandingPageForm from "@/app/components/LandingPageForm";
import withAuth from "@/app/components/withAuth";
import { useParams } from "next/navigation";

const LandingPageEditor: React.FC = () => {
	const { id } = useParams();

	return (
		<div className='min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 p-6 flex flex-col items-center justify-center'>
			<div className='w-full max-w-4xl bg-white shadow-lg rounded-lg p-8'>
				<h1 className='text-4xl font-bold text-gray-900 mb-6 text-center'>
					{id === "new" ? "Create" : "Edit"} Landing Page
				</h1>
				<LandingPageForm id={id as string} />
			</div>
		</div>
	);
};

export default withAuth(LandingPageEditor);
