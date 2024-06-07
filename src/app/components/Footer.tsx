import React from "react";

const Footer: React.FC<{ content: string }> = ({ content }) => {
	return (
		<footer className='bg-gray-800 text-white p-4 rounded-md mt-4'>
			<p>{content}</p>
		</footer>
	);
};

export default Footer;
