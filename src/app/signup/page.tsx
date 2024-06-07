"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Signup: React.FC = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const router = useRouter();

	const handleSignup = () => {
		if (password !== confirmPassword) {
			alert("Passwords do not match");
			return;
		}
		// For simplicity, we're storing the user in local storage. In a real app, you would send a request to the server.
		localStorage.setItem("user", JSON.stringify({ username, password }));
		localStorage.setItem("authenticated", "true");
		router.push("/dashboard");
	};

	return (
		<div className='flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500'>
			<div className='bg-white p-8 rounded-xl shadow-lg w-80'>
				<h2 className='text-3xl font-bold mb-6 text-center text-gray-800'>
					Signup
				</h2>
				<input
					type='text'
					placeholder='Username'
					value={username}
					onChange={e => setUsername(e.target.value)}
					className='w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-green-500 text-black'
				/>
				<input
					type='password'
					placeholder='Password'
					value={password}
					onChange={e => setPassword(e.target.value)}
					className='w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-green-500 text-black'
				/>
				<input
					type='password'
					placeholder='Confirm Password'
					value={confirmPassword}
					onChange={e => setConfirmPassword(e.target.value)}
					className='w-full p-3 border border-gray-300 rounded-md mb-6 focus:outline-none focus:ring-2 focus:ring-green-500 text-black'
				/>
				<button
					onClick={handleSignup}
					className='w-full bg-green-500 text-white p-3 rounded-md shadow-md hover:bg-green-600 transition-all duration-300'
				>
					Signup
				</button>
			</div>
		</div>
	);
};

export default Signup;
