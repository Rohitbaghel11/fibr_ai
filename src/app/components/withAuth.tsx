"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const withAuth = (WrappedComponent: React.FC) => {
	const AuthComponent: React.FC = props => {
		const router = useRouter();

		useEffect(() => {
			if (!localStorage.getItem("authenticated")) {
				router.push("/login");
			}
		}, []);

		return <WrappedComponent {...props} />;
	};

	return AuthComponent;
};

export default withAuth;
