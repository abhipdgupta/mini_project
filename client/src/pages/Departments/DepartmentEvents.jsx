import React, { useEffect, useState } from "react";

import home from "../../css/home.module.css";
import { NavLink, useOutletContext } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { departmentMap } from "../../utils/departmentMap";
export const DepartmentEvents = () => {
  const [news, setNews] = useState([]);

  const { department_name } = useOutletContext();
  const fetchNews = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const newsresponse = await fetch(
      `${import.meta.env.VITE_REACT_BASE_BACKEND_URL}/news-events/?limit=6`,
      requestOptions
    );
    const newsdata = await newsresponse.json();

    setNews(newsdata.allNews);
  };

  useEffect(() => {
    if (news.length == 0) fetchNews();
    console.log(news);
  }, [news]);

  return (
    <>
      <div className={home.depart_events}>
        <h1>EVENTS</h1>
        <div className={home.news_side}>
          {news?.length > 0 &&
            news.map((item) => {
              return item.type.includes(departmentMap[department_name]) ? (
                <div key={item._id} className={home.news_}>
                  <NavLink to={`/news-events/${item._id}`}>
                    <img
                      src={`${import.meta.env.VITE_REACT_BASE_BACKEND_URL}/${
                        item.thumbnailUrl
                      }`}
                      alt="hello"
                    />
                    <h1>{item.title}</h1>
                  </NavLink>
                </div>
              ) : (
                ""
              );
            })}
        </div>
      </div>
    </>
  );
};
