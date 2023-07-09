import React, { useEffect, useState } from "react";
import styles from "../css/news.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import deleteIcon from "../assets/delete_icon.png"; //<a href="https://www.flaticon.com/free-icons/delete" title="delete icons">Delete icons created by IYAHICON - Flaticon</a>
import LazyLoad from "react-lazy-load";

export const NewsComponent = ({ news, creationDate, setAllNews, AllNews }) => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [deletepopup, setdeletepopup] = useState(false);

  const handleClick = (e) => {
    navigate(`/news-events/${news._id}`);
  };

  const handleDeletePopup = (e) => {
    if (deletepopup == false) setdeletepopup(true);
    else if (deletepopup == true) setdeletepopup(false);
  };
  const handleDelete = (choice) => {
    if (choice == "y") {
      const requesOptions = {
        method: "DELETE",
      };
      // const myArray = [...AllNews];
      // const index = myArray.findIndex((obj) => obj._id === news._id);

      // if (index !== -1) {
      //   myArray.splice(index, 1);
      // }
      // setAllNews(myArray);
      fetch(
        `${import.meta.env.VITE_REACT_BASE_BACKEND_URL}/news-events/${news._id}`,
        requesOptions
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          const myArray = [...AllNews];
          const index = myArray.findIndex((obj) => obj._id === news._id);

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
    <div className={styles.news_container}>
      <LazyLoad className={styles.news_img}>
        <img
          src={`${import.meta.env.VITE_REACT_BASE_BACKEND_URL}/${
            news.thumbnailUrl
          }`}
          alt="hello"
        />
      </LazyLoad>

      <div className={styles.news_content}>
        <div className={styles.news_title}>
          <h2>{news.title}</h2>
        </div>
        <div className={styles.news_description}>
          <p>
            {news.description.slice(0, 100)}
            <button onClick={handleClick}>...read more</button>
          </p>
        </div>
        <span>{creationDate.split("T")[0]}</span>
      </div>
      {auth?.isAuthenticated && auth?.role.includes("ADMIN") && (
        <div className={styles.news_delete} onClick={handleDeletePopup}>
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
