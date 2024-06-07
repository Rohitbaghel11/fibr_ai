import LandingPageList from "../components/LandingPageList";

const Dashboard: React.FC = () => {
	return (
		<div className='min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex flex-col items-center py-10'>
			<div className='bg-[#fffff6] w-full max-w-4xl p-8 rounded-lg shadow-lg'>
				<h1 className='text-4xl font-bold text-center text-gray-800 mb-8'>
					Dashboard
				</h1>
				<LandingPageList />
			</div>
		</div>
	);
};

export default Dashboard;
