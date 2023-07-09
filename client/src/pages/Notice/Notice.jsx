import React, { useEffect, useState } from "react";
import styles from "../../css/notice.module.css";
import { NoticeComponent } from "../../components/NoticeComponent";
import { Loading } from "../../components/Loading";
export const Notice = () => {
	const [notices, setnotices] = useState([]);
	const [loading, setloading] = useState(true);
	const fetchNotices = async () => {
		const requestOptions = {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		};
		const response = await fetch(
			`${import.meta.env.VITE_REACT_BASE_BACKEND_URL}/notice`,
			requestOptions
		);
		const data = await response.json();

		console.log(data);
		setnotices(data.allNotice);
		if(data)setloading(false)
	};
	useEffect(() => {
		fetchNotices();
	}, []);

	if(loading)return <Loading type={"spin"} color={"#227490"} />
	return (
		<div className={styles.all_notice_container}>
			{notices.map((notice) => {
				return <NoticeComponent notice={notice} key={notice._id} notices={notices} setnotices={setnotices} />;
			})}
		</div>
	);
};
