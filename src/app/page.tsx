"use client";

import { useRouter } from "next/navigation";

const HomePage: React.FC = () => {
	const router = useRouter();

	const handleLogin = () => {
		// Redirect to login page or dashboard if already logged in
		const user = localStorage.getItem("user");
		if (user) {
			router.push("/dashboard");
		} else {
			router.push("/login");
		}
	};

	return (
		<div className='flex flex-col items-center justify-center min-h-screen py-2'>
			<h1 className='text-4xl font-bold'>Welcome to Your Application</h1>
			<button
				onClick={handleLogin}
				className='mt-4 bg-blue-500 text-white px-4 py-2 rounded-md'
			>
				Go to Dashboard
			</button>
		</div>
	);
};

export default HomePage;
