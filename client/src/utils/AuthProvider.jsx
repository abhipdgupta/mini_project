import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [auth, setauth] = useState({
		isAuthenticated: false,
		role: [],
		tokenid: "",
		username:"",
		email:"",
	});
	
	return (
		<AuthContext.Provider value={{ auth, setauth }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
