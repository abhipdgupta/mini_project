import React, { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "../../css/StudentLoginSignup.module.css"

export const StudentSignup = () => {
	const nameRef = useRef(0);
	const emailRef = useRef(0);
	const passwordRef = useRef(0);
	const rollnoRef = useRef(0);
	const phonenoRef = useRef(0);
	const batchRef = useRef(0);
	const addressRef = useRef(0);
	const branchRef = useRef(0);

	const navigate = useNavigate();
	const initialvalues = {
		name: "",
		email: "",
		password: "",
		rollno: "",
		phoneno: "",
		batch: "",
		address: "",
		branch: "",
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
		rollnoRef.current.style.border =
			rollnoRef.current.value == ""
				? "1px solid red"
				: "1px solid rgb(126, 7, 237)";
		phonenoRef.current.style.border =
			phonenoRef.current.value == ""
				? "1px solid red"
				: "1px solid rgb(126, 7, 237)";
		batchRef.current.style.border =
			batchRef.current.value == ""
				? "1px solid red"
				: "1px solid rgb(126, 7, 237)";
		addressRef.current.style.border =
			addressRef.current.value == ""
				? "1px solid red"
				: "1px solid rgb(126, 7, 237)";
		branchRef.current.style.border =
			branchRef.current.value == ""
				? "1px solid red"
				: "1px solid rgb(126, 7, 237)";

		seterror_msg(initialvalues);

		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(values),
		};
		// console.log(requestOptions.body);
		fetch(`${import.meta.env.VITE_REACT_BASE_BACKEND_URL}/student/signup`, requestOptions)
			.then((response) => response.json())
			.then((data) => {
				if (data.name && data.name=="ValidationError") {
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
				} else if (data.name=="DuplicateKeyError") {
					for (const key in data.keyValue	) {
						seterror_msg((pre_error_msg) => {
							return {
								...pre_error_msg,
								[key]: "already exist",
							};
						});
					}
				} else if(data.created){
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
					<div className={styles.title}>Student SIGNUP</div>
					<div className={styles.wrapper}>
						<div className={styles.left}>
							<label htmlFor="student_name">Name</label>
							<div>
								<input
									ref={nameRef}
									type="text"
									name="name"
									id="student_name"
									onChange={handlechange}
									value={values.name}
								/>
								<span>{error_msg.name}</span>
							</div>

							<label htmlFor="student_email">Email</label>
							<div>
								<input
									ref={emailRef}
									type="text"
									name="email"
									id="student_email"
									onChange={handlechange}
									value={values.email}
								/>
								<span>{error_msg.email}</span>
							</div>

							<label htmlFor="student_rollno">Roll no.</label>
							<div>
								<input
									ref={rollnoRef}
									type="string"
									name="rollno"
									id="student_rollno"
									onChange={handlechange}
									value={values.rollno}
								/>
								<span>{error_msg.rollno}</span>
							</div>

							<label htmlFor="student_password">Password</label>
							<div>
								<input
									ref={passwordRef}
									type="text"
									name="password"
									id="student_password"
									onChange={handlechange}
									value={values.password}
								/>
								<span>{error_msg.password}</span>
							</div>
						</div>

						<div className={styles.right}>
							<label htmlFor="student_phoneno">Phone no.</label>
							<div>
								<input
									ref={phonenoRef}
									type="text"
									name="phoneno"
									id="student_phoneno"
									onChange={handlechange}
									value={values.phoneno}
								/>
								<span>{error_msg.phoneno}</span>
							</div>

							<label htmlFor="student_batch">Batch</label>
							<div>
								<input
									ref={batchRef}
									type="text"
									name="batch"
									id="student_batch"
									onChange={handlechange}
									value={values.batch}
								/>
								<span>{error_msg.batch}</span>
							</div>

							<label htmlFor="student_address">Address</label>
							<div>
								<input
									ref={addressRef}
									type="text"
									name="address"
									id="student_address"
									onChange={handlechange}
									value={values.address}
								/>
								<span>{error_msg.address}</span>
							</div>

							<label htmlFor="student_branch">Branch</label>
							<div>
								<select
									ref={branchRef}
									name="branch"
									id="student_branch"
									value={values.branch}
									onChange={handlechange}
								>
									<option value="">--SELECT--</option>
									<option value="CSE">CSE</option>
									<option value="CIVIL">CIVIL</option>
									<option value="ELECTRICAL">ELECTRICAL</option>
									<option value="MECHANICAL">MECHANICAL</option>
									<option value="INSTRUMENTATION">INSTRUMENTATION</option>
									<option value="MCA">MCA</option>
								</select>
								<span>{error_msg.branch}</span>
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
