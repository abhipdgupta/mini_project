import React, { useState } from "react";
import style from "../../css/noticeUpload.module.css";
export const NoticeUpload = () => {
	const [title, setTitle] = useState("");
	const [uploadFile, setUploadFile] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("notice_title", title);
		formData.append("notice_pdf", uploadFile);

		const requestOptions = {
			method: "POST",
			body: formData,
		};

		const response = await fetch(
			`${import.meta.env.VITE_REACT_BASE_BACKEND_URL}/notice/`,
			requestOptions
		);
		const data = await response.json();

		console.log(data);
	};

	return (
		<>
			<form
				className={style.form}
				onSubmit={handleSubmit}
				encType="multipart/form-data"
			>
				<div className="title">
					<label htmlFor="notice_title">Notice Title </label>
					<input
						type="text"
						name="notice_title"
						id="notice_title"
						onChange={(e) => setTitle(e.target.value)}
						value={title}
					/>
				</div>
				<div className={style.pdf}>
					<label htmlFor="notice_pdf">Upload Pdf</label>
					<input
						type="file"
						accept="application/pdf"
						name="notice_pdf"
						id="notice_pdf"
						onChange={(e) => {
							setUploadFile(e.target.files[0]);
						}}
					/>
				</div>
				<button type="submit">Submit</button>
			</form>
		</>
	);
};
