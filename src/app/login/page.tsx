"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Login: React.FC = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const router = useRouter();

	const handleLogin = () => {
		// Retrieve user from local storage (for demo purposes)
		const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
		if (
			storedUser.username === username &&
			storedUser.password === password
		) {
			localStorage.setItem("authenticated", "true");
			router.push("/dashboard");
		} else {
			alert("Invalid credentials");
		}
	};

	return (
		<div className='flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600'>
			<div className='bg-white p-8 rounded-xl shadow-lg w-80'>
				<h2 className='text-3xl font-bold mb-6 text-center text-gray-800'>
					Login
				</h2>
				<input
					type='text'
					placeholder='Username'
					value={username}
					onChange={e => setUsername(e.target.value)}
					className='w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black'
				/>
				<input
					type='password'
					placeholder='Password'
					value={password}
					onChange={e => setPassword(e.target.value)}
					className='w-full p-3 border border-gray-300 rounded-md mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black'
				/>
				<button
					onClick={handleLogin}
					className='w-full bg-blue-500 text-white p-3 rounded-md shadow-md hover:bg-blue-600 transition-all duration-300'
				>
					Login
				</button>
				<p className='mt-4 text-center'>
					Don't have an account?{" "}
					<a href='/signup' className='text-blue-500 hover:underline'>
						Sign up
					</a>
				</p>
			</div>
		</div>
	);
};

export default Login;
