import React from "react";

interface HeaderProps {
	content: string;
	logoUrl?: string;
	bgColor?: string;
	textColor?: string;
	fontSize?: string;
	textAlign?: "left" | "center" | "right";
}

const Header: React.FC<HeaderProps> = ({
	content,
	logoUrl,
	bgColor = "bg-gray-800",
	textColor = "text-white",
	fontSize = "text-2xl",
	textAlign = "center"
}) => {
	return (
		<header
			className={`${bgColor} ${textColor} p-4 rounded-md shadow-md flex items-center`}
		>
			{logoUrl && (
				<img src={logoUrl} alt='Logo' className='h-10 w-10 mr-4' />
			)}
			<h1 className={`${fontSize} font-bold text-${textAlign}`}>
				{content}
			</h1>
		</header>
	);
};

export default Header;
