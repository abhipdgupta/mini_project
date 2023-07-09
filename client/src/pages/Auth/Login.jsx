import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "../../css/StudentLoginSignup.module.css";
import { useAuth } from "../../hooks/useAuth";

export const Login = () => {
	const { auth, setauth } = useAuth();
	const navigate = useNavigate();

	const initialvalues = {
		user_email: "",
		user_password: "",
		user_role:"",
	};
	const [values, setvalues] = useState(initialvalues);
	const [error_msg, seterror_msg] = useState("");
	const handlechange = (e) => {
		setvalues({ ...values, [e.target.name]: e.target.value });
	};
	const handlesubmit = (e) => {
		e.preventDefault();

		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(values),
		};
	
		fetch(
			`${import.meta.env.VITE_REACT_BASE_BACKEND_URL}/login`,
			requestOptions
		)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				if (data.success) {
					localStorage.setItem("tokenid", data.tokenid);
					setauth({
						isAuthenticated: true,
						role: data.role,
						tokenid: data.tokenid,
						username:data.username,
						email:data.email,
					});
					navigate("/");
				}
				seterror_msg("");

				seterror_msg(data.message);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	return (
		<>
			<div className={`${styles.container} ${styles.login_container}`}>
				<form onSubmit={handlesubmit}>
					<div className={styles.title}>LOGIN</div>

					<div className={styles.left}>
						<label htmlFor="user_email">Email</label>
						<div>
							<input
								type="text"
								name="user_email"
								id="user_email"
								onChange={handlechange}
								value={values.user_email}
							/>
						</div>

						<label htmlFor="user_password">Password</label>
						<div>
							<input
								type="text"
								name="user_password"
								id="user_password"
								onChange={handlechange}
								value={values.user_password}
							/>
						</div>
						<label htmlFor="user_role">Role</label>
						<div>
							<select
								name="user_role"
								id="user_role"
								value={values.user_role}
								onChange={handlechange}
							>
								<option value="">--SELECT--</option>
								<option value="FACULTY">FACULTY</option>
								<option value="STUDENT">STUDENT</option>
								<option value="OTHER">OTHER</option>
							</select>
						</div>
					</div>
					<button type="submit">Login</button>

					<span>{error_msg}</span>
				</form>
			</div>
		</>
	);
};
