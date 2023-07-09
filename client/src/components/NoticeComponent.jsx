import React, { useState } from "react";
import styles from "../css/notice.module.css";
import { useAuth } from "../hooks/useAuth";
import deleteIcon from "../assets/delete_icon.png"; //<a href="https://www.flaticon.com/free-icons/delete" title="delete icons">Delete icons created by IYAHICON - Flaticon</a>

export const NoticeComponent = ({ notice,notices ,setnotices}) => {
  const {auth}=useAuth()
  const [deletepopup, setdeletepopup] = useState(false);
  const handleDeletePopup = (e) => {
		if (deletepopup == false) setdeletepopup(true);
		else if (deletepopup == true) setdeletepopup(false);
	};
  const handleDelete = (choice) => {
		if (choice == "y") {
			const requesOptions = {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			};
			const myArray = [...notices];
			const index = myArray.findIndex((obj) => obj._id === notice._id);

			if (index !== -1) {
				myArray.splice(index, 1);
			}
			setnotices(myArray);
			fetch(`${import.meta.env.VITE_REACT_BASE_BACKEND_URL}/notice/${notice._id}`, requesOptions)
				.then((response) => response.json())
				.then((data) => {
					console.log(data);
					const myArray = [...notices];
					const index = myArray.findIndex((obj) => obj._id === news_id);

					if (index !== -1) {
						myArray.splice(index, 1);
					}
					setAllNews(myArray);
				})
				.catch((e) => console.log(e));

			setdeletepopup(false);
		} else if (choice == "n") setdeletepopup(false);
	};
	return (
		<div className={styles.notice_container}>
			<div>
				<a
					target="_blank"
					href={`${import.meta.env.VITE_REACT_BASE_BACKEND_URL}/notice/${
						notice.pdfUrl
					}`}
				>
					<span>{notice.title} </span><p>...view</p>
				</a>
			</div>
			<div>{notice.createdAt.split("T")[0]}</div>
      {auth?.isAuthenticated && (
				<div className={styles.notice_delete} onClick={handleDeletePopup}>
					<img src={deleteIcon} alt="delete icon" />
				</div>
			)}
			{deletepopup && (
				<div className={styles.delete_popup}>
					<p> Confirm.You want to Delete?</p>
					<div>
						<button onClick={() => handleDelete("y")}>Yes</button>
						<button onClick={() => handleDelete("n")}>No</button>
					</div>
				</div>
			)}
		</div>
	);
};
