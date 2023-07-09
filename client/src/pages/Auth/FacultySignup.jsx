import React, { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "../../css/StudentLoginSignup.module.css";

export const FacultySignup = () => {
	const nameRef = useRef(0);
	const emailRef = useRef(0);
	const passwordRef = useRef(0);
	const usernameRef = useRef(0);
	const facultynoRef = useRef(0);
	const phonenoRef = useRef(0);
	const addressRef = useRef(0);
	const departmentRef = useRef(0);

	const navigate = useNavigate();
	const initialvalues = {
		name: "",
		email: "",
		password: "",

		facultyno: "",
		phoneno: "",
		address: "",
		department: "",
	};
	const [values, setvalues] = useState(initialvalues);
	const [error_msg, seterror_msg] = useState(initialvalues);

	const handlechange = (e) => {
		setvalues({ ...values, [e.target.name]: e.target.value });
	};

	const handlesubmit = (e) => {
		e.preventDefault();

		nameRef.current.style.border =
			nameRef.current.value == ""
				? "1px solid red"
				: "1px solid rgb(126, 7, 237)";
		emailRef.current.style.border =
			emailRef.current.value == ""
				? "1px solid red"
				: "1px solid rgb(126, 7, 237)";
		passwordRef.current.style.border =
			passwordRef.current.value == ""
				? "1px solid red"
				: "1px solid rgb(126, 7, 237)";

		facultynoRef.current.style.border =
			facultynoRef.current.value == ""
				? "1px solid red"
				: "1px solid rgb(126, 7, 237)";
		phonenoRef.current.style.border =
			phonenoRef.current.value == ""
				? "1px solid red"
				: "1px solid rgb(126, 7, 237)";
		addressRef.current.style.border =
			addressRef.current.value == ""
				? "1px solid red"
				: "1px solid rgb(126, 7, 237)";
		departmentRef.current.style.border =
			departmentRef.current.value == ""
				? "1px solid red"
				: "1px solid rgb(126, 7, 237)";

		seterror_msg(initialvalues);

		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(values),
		};
		// console.log(requestOptions.body);
		fetch(
			`${import.meta.env.VITE_REACT_BASE_BACKEND_URL}/faculty/signup`,
			requestOptions
		)
			.then((response) => response.json())
			.then((data) => {
				if (data.name && data.name == "ValidationError") {
					for (const key in data.message) {
						if (data.message.hasOwnProperty(key)) {
							seterror_msg((pre_error_msg) => {
								return {
									...pre_error_msg,
									[key]: data.message[key].message,
								};
							});
						}
					}
				} else if (data.name == "DuplicateKeyError") {
					for (const key in data.keyValue) {
						seterror_msg((pre_error_msg) => {
							return {
								...pre_error_msg,
								[key]: "already exist",
							};
						});
					}
				} else if (data.created) {
					navigate("/login");
				}
			})
			.catch((error) => {
				console.error(error);
			});
	};
	return (
		<>
			<div className={styles.container}>
				<form onSubmit={handlesubmit}>
					<div className={styles.title}>FACULTY SIGNUP</div>
					<div className={styles.wrapper}>
						<div className={styles.left}>
							<label htmlFor="faculty_name">Name</label>
							<div>
								<input
									ref={nameRef}
									type="text"
									name="name"
									id="faculty_name"
									onChange={handlechange}
									value={values.name}
								/>
								<span>{error_msg.name}</span>
							</div>

							<label htmlFor="faculty_email">Email</label>
							<div>
								<input
									ref={emailRef}
									type="text"
									name="email"
									id="faculty_email"
									onChange={handlechange}
									value={values.email}
								/>
								<span>{error_msg.email}</span>
							</div>

							<label htmlFor="faculty_facultyno">Faculty no.</label>
							<div>
								<input
									ref={facultynoRef}
									type="text"
									name="facultyno"
									id="faculty_facultyno"
									onChange={handlechange}
									value={values.facultyno}
								/>
								<span>{error_msg.facultyno}</span>
							</div>

							<label htmlFor="faculty_password">Password</label>
							<div>
								<input
									ref={passwordRef}
									type="text"
									name="password"
									id="faculty_password"
									onChange={handlechange}
									value={values.password}
								/>
								<span>{error_msg.password}</span>
							</div>
						</div>

						<div className={styles.right}>
							<label htmlFor="faculty_phoneno">Phone no.</label>
							<div>
								<input
									ref={phonenoRef}
									type="text"
									name="phoneno"
									id="faculty_phoneno"
									onChange={handlechange}
									value={values.phoneno}
								/>
								<span>{error_msg.phoneno}</span>
							</div>

							<label htmlFor="faculty_address">Address</label>
							<div>
								<input
									ref={addressRef}
									type="text"
									name="address"
									id="faculty_address"
									onChange={handlechange}
									value={values.address}
								/>
								<span>{error_msg.address}</span>
							</div>

							<label htmlFor="faculty_department">Department</label>
							<div>
								<select
									ref={departmentRef}
									name="department"
									id="faculty_department"
									value={values.department}
									onChange={handlechange}
								>
									<option value="">--SELECT--</option>
									<option value="CSE">CSE</option>
									<option value="CIVIL">CIVIL</option>
									<option value="ELECTRICAL">ELECTRICAL</option>
									<option value="MECHANICAL">MECHANICAL</option>
									<option value="INSTRUMENTATION">INSTRUMENTATION</option>
									<option value="MCA">MCA</option>
									<option value="HUMANITIES">HUMANITIES</option>
									<option value="PHYSICS">PHYSICS</option>
									<option value="CHEMISTRY">CHEMISTRY</option>
									<option value="MATHEMATICS">MATHEMATICS</option>
								</select>
								<span>{error_msg.department}</span>
							</div>
						</div>
					</div>
					<button type="submit">Signup</button>
					<Link className={styles.link} to="/student/login">
						LOGIN
					</Link>
				</form>
			</div>
		</>
	);
};
