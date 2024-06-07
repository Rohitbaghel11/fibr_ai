"use client";
import { useState, useEffect } from "react";

interface AnalyticsData {
	id: string;
	pageTitle: string;
	views: number;
	clickThroughRate: number;
}

const Analytics: React.FC = () => {
	const [analytics, setAnalytics] = useState<AnalyticsData[]>([]);

	useEffect(() => {
		const storedAnalytics: AnalyticsData[] = JSON.parse(
			localStorage.getItem("analytics") || "[]"
		);
		setAnalytics(storedAnalytics);
	}, []);

	return (
		<div>
			<h2>Analytics</h2>
			<ul>
				{analytics.map(data => (
					<li key={data.id}>
						{data.pageTitle}: {data.views} views,{" "}
						{data.clickThroughRate}% CTR
					</li>
				))}
			</ul>
		</div>
	);
};

export default Analytics;
