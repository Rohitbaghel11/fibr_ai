import React from "react";

const TextBlock: React.FC<{ content: string }> = ({ content }) => {
	return (
		<div className='bg-white text-black p-4 rounded-md shadow-md mt-4'>
			<p>{content}</p>
		</div>
	);
};

export default TextBlock;
