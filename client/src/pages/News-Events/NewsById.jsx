import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../../css/newsById.module.css";
import { Loading } from "../../components/Loading";
import {NotFound404} from "../../components/NotFound404"
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";

import markD from "../../css/markdown.module.css";

export const NewsById = () => {
  const [news, setnews] = useState([]);
  const [myerror, setMyerror] = useState("");
  const [newsMardown, setNewsMardown] = useState("");
  const { id } = useParams();

  const fetchNewsById = async () => {
    if (!id) return;
    const response = await fetch(
      `${import.meta.env.VITE_REACT_BASE_BACKEND_URL}/news-events/${id}`,
      {
        method: "GET",
      }
    );

    const data = await response.json();

    if (data.success) {
      setnews(data.News);
      console.log(data);
    } else {
      setMyerror("404 not found");
    }
  };

  const fetchMarkdown = async () => {
    if(news.length==0) return
    const response = await fetch(
      `${import.meta.env.VITE_REACT_BASE_BACKEND_URL}/${news.markdownFileUrl}`,
      {
        method: "GET",
      }
    );

    if (response.status === 200) {
      const data = await response.text();

      setNewsMardown(data);
    } else {
      setMyerror("404 not found");
    }
  };
  useEffect(() => {
    fetchNewsById();
    setMyerror("");
  }, [id]);

  useEffect(() => {
    fetchMarkdown();
    setMyerror("");
  }, [news]);
  if (myerror) {
    return <NotFound404/>
  }
  if (news.length == 0) {
    return <Loading type={"spin"} color={"#227490"} />;
  }

  return (
    <>
      <div className={styles.single_news_details}>
        <div className={markD.markdown}>
          {/* <div className={styles.news_img}>
            <img
              src={`${import.meta.env.VITE_REACT_BASE_BACKEND_URL}/${
                news.thumbnailUrl
              }`}
              alt={news.title}
            />
          </div> */}

          <span>Dated : {news.createdAt.split("T")[0]}</span>
          <div className={styles.gallery_container}>
            <h1>Gallery</h1>
            <div className={styles.gallery}>
              {news?.imagesPath?.map((image, index) => {
                return (
                  <img
                    key={index}
                    src={`${
                      import.meta.env.VITE_REACT_BASE_BACKEND_URL
                    }/${image}`}
                    alt={`${news.title}`}
                  />
                );
              })}
            </div>
          </div>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {newsMardown}
          </ReactMarkdown>
        </div>
      </div>
    </>
  );
};
