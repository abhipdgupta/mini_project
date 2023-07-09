import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const ProtectedRoutes = ({ children }) => {
	const { auth, setauth } = useAuth();

	console.log(auth);
	if (auth.isAuthenticated && auth.role?.includes("ADMIN") )
		return children ? children : <Outlet />;

	else {
		return (
			<>
				<h1>401 UNTHORIZED CONTACT ADMIN</h1>
			</>
		);
	}
};


// roles could be STUDENT,FACULTY,ADMIN,NONE
