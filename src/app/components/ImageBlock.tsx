import React from "react";

const ImageBlock: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
	return (
		<div className='mt-4'>
			<img src={src} alt={alt} className='w-full rounded-md shadow-md' />
		</div>
	);
};

export default ImageBlock;
