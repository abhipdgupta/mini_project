import React, { useState, useEffect, useRef } from "react";

import JecImage04 from "../assets/jec_image_04.jpg";
import JecImage06 from "../assets/jec_image_06.jpg";

import JecImage01 from "../assets/jec_image_01.webp";

import Principal from "../assets/principal.png";
import styles from "../css/courasel.module.css";
import home from "../css/home.module.css";
import { NavLink } from "react-router-dom";
import Marquee from "react-fast-marquee";
export const Home = () => {
  return (
    <>
      <Courasel>
        <CouraselItem path={JecImage04} />
        <CouraselItem path={JecImage01} />
        <CouraselItem path={JecImage06} />
      </Courasel>
      <div className={home.infographic}>
        <Marquee>
          <p>Result for the session 2022-23 is Out.</p>
        </Marquee>
      </div>
      <div className={home.newsAndNotice}>
        <div className={home.leftNews}>
          <div className={home.news_link}>
            <NavLink to={"/news-events"}>NEWS-EVENTS</NavLink>
          </div>
          <HomeNews />
        </div>
        <div className={home.rightNotice}>
          <div className={home.notice_link}>
            <NavLink to={"/notice"}>NOTICE</NavLink>
          </div>
          <HomeNotice />
        </div>
      </div>
      <div className={home.about_section}>
        <h1>About</h1>
        <p>
          Jorhat Engineering College, a premiere technical institute of North
          East India has completed its 62 years of relentless th service to the
          society. The college started functioning with its first batch of
          students in Civil Engineering on the 10 of October, 1960. The college,
          affiliated to Assam Science and Technology University, currently
          offers AICTE recognized B. Tech courses on Civil, Mechanical ,
          Electrical, Computer Science and Instrumentation and M.Tech courses in
          Civil and Electrical Engineering. The college has been offering a
          three year post graduate course leading to Masters of Computer
          Applications since 1987.
        </p>
      </div>
      <div className={home.pricipal_desk}>
        <div className={home.pricipal_desk_wrapper}>
          <div className={home.principal_img}>
            <img src={Principal} alt="" />
            <p>Dr. Rupam Baruah,</p>
            <p> Principal i/c,</p>
            <p>Jorhat Engineering College</p>
          </div>
          <h1>FROM THE PRINCIPAL'S DESK</h1>
          <p>
            It is my pleasure to extend warm welcome to Jorhat Engineering
            College, a premier and leading technical institute of North East
            India, established in 1960 by the Government of Assam. In a span of
            62 years, JEC has come a long way and made its impact felt not only
            in the state but also in the country and abroad. The students of JEC
            have performed exceedingly well in service and higher studies in
            national and global level. Five under graduate programmes, three
            post graduate programmes and PhD programmes are conducted in JEC.
            Beyond regular academics in under graduate and post graduate levels,
            the need based research activities are being conducted here. At
            present, in the world of competition, JEC is putting effort to excel
            with perfection to survive.
          </p>
          <p>
            Utmost care is taken to impart education in a disciplined way to
            achieve coveted educational objectives. The students are provided
            with all possible support for co-curricular and extracurricular
            activities. They showcase their talents in annual college week,
            annual technical, cultural and literary competitions.
          </p>
          <p>
            The students get motivated to become socially responsible involving
            in flood relief, blood donation, cleanliness drive etc in every
            year. They are also encouraged to take part in available facilities
            such as NCC, NSS etc. Students are encouraged to take part in
            activities in the line of Make in India, Skill India, Digital India,
            Start up India initiatives. It is worthwhile to mention that the
            students of JEC are capable to perform in these activities. JEC
            feels proud that an ex-student of JEC has become competent to
            receive an award in Crores of Rupees for his start up project from
            the present Honorable Prime Minister of India. It reflects the
            potential of the students of JEC. As regards to other facilities,
            JEC has uninterrupted power supply, Wi-Fi in college building,
            uninterrupted internet facilities, Training and Placement cell, well
            equipped laboratories and workshops. I feel proud to acknowledge the
            contributions of qualified faculty in building career of the
            students
          </p>
          <p>
            They are always ready to move ahead continuously for producing and
            maintaining the best. They are always giving emphasis on
            learning-teaching process based on motivating factors. It is
            pertinent to point out that JEC has responsibility beyond four walls
            of its building. JEC has participated in "Unnat Bharat Abhiyan" of
            MHRD where cluster of five villages representing different
            categories of society in Jorhat district are chosen. A team of
            faculty members are extending dedicated services for development of
            these underdeveloped villages by transferring technology and
            technical know-how to an extent. Also, two other programmes such as
            NIJLM and PMKVY are run by a faculty for under privileged and school
            drop outs as a mark of rendering service to the nation.
          </p>
          <p>
            In truest sense "Hard Work, Dedication and Professional Ethics will
            only help us all in transforming potential of our students into
            human resource".
          </p>
          <p> Principal Jorhat Engineering College</p>
        </div>
      </div>
    </>
  );
};
const HomeNotice = () => {
  const [notice, setNotice] = useState([]);
  const fetchNotice = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const noticeresponse = await fetch(
      `${import.meta.env.VITE_REACT_BASE_BACKEND_URL}/notice/?limit=6`,
      requestOptions
    );
    const noticedata = await noticeresponse.json();

    setNotice(noticedata.allNotice);
  };

  useEffect(() => {
    if (notice.length === 0) fetchNotice();
    console.log(notice);
  }, [notice]);

  return (
    <>
      <div className={home.notice_side}>
        {notice?.length > 0 &&
          notice.map((item) => {
            return (
              <div key={item._id} className={home.notice_}>
                <a
                  target="_blank"
                  href={`${
                    import.meta.env.VITE_REACT_BASE_BACKEND_URL
                  }/notice/${item.pdfUrl}`}
                >
                  <h1>{item.title}</h1>
                  
                </a>
                <span>{item.createdAt.split("T")[0]}</span>
              </div>
            );
          })}
      </div>
    </>
  );
};
const HomeNews = () => {
  const [news, setNews] = useState([]);

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
      <div className={home.news_side}>
        {news?.length > 0 &&
          news.map((item) => {
            return (
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
            );
          })}
      </div>
    </>
  );
};

const Courasel = ({ children }) => {
  const controlRef = useRef(null);
  const [translate, setTranslate] = useState(0);
  const intervalRef = useRef(null);

  const startInterval = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setTranslate((prev) => {
        if (prev - 100 < (children.length - 1) * -100) {
          return 0;
        } else {
          return prev - 100;
        }
      });
    }, 6000);
  };
  useEffect(() => {
    startInterval();
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    controlRef.current.style.transform = `translateX(${translate}%)`;
  }, [translate]);

  const handleLeft = () => {
    startInterval();
    setTranslate((prev) => {
      if (prev + 100 > 0) {
        return (children.length - 1) * -100;
      } else return prev + 100;
    });
  };

  const handleRight = () => {
    startInterval();
    setTranslate((prev) => {
      if (prev - 100 < (children.length - 1) * -100) {
        return 0;
      } else {
        return prev - 100;
      }
    });
  };

  return (
    <div className={styles.courasel_container}>
      <div onClick={handleLeft} className={styles.courasel_control_left}></div>
      <div ref={controlRef} className={styles.courasel_item_wrapper}>
        {children}
      </div>
      <div
        onClick={handleRight}
        className={styles.courasel_control_right}
      ></div>
    </div>
  );
};

const CouraselItem = ({ path }) => {
  return (
    <div className={styles.courasel_item}>
      <img src={path} alt="" />
    </div>
  );
};
