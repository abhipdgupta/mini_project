import React, { useEffect, useState } from "react";
import { NewsComponent } from "../../components/NewsComponent";
import styles from "../../css/news.module.css";

import { Loading } from "../../components/Loading";

export const News = () => {
	const [allNews, setAllNews] = useState([]);
	const [loading, setloading] = useState(true);
	const fetchAllNews = async () => {
		const requestOptions = {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		};

		const response = await fetch(
			`${import.meta.env.VITE_REACT_BASE_BACKEND_URL}/news-events/` ,
			requestOptions
		);
		const data = await response.json();

		console.log(data);
		setAllNews(data.allNews);
		if(data)setloading(false)
	};

	useEffect(() => {
		fetchAllNews();
	}, []);

	if(loading)return <Loading type={"spin"} color={"#227490"} />
	return (
		<>	
			
			<div className={styles.all_news_container}>
				{allNews?.length>0 &&  allNews.map((item) => {
					return (
						<NewsComponent
							key={item._id}
							news={item}
							creationDate={item.createdAt}
							setAllNews={setAllNews}
							AllNews={allNews}
						/>
					);
				})}
			</div>
		</>
	);
};
