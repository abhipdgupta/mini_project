import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import styles from "../../../css/markdown.module.css";
import { Loading } from "../../../components/Loading";

import {NotFound404} from "../../../components/NotFound404"

export const HostelById = () => {
  const { hostel_no } = useParams();

  const [hostelInfo, setHostelInfo] = useState("");
  const [error, seterror] = useState("");
  const [loading, setloading] = useState(true);
  // console.log("hostel",hostelInfo);
  const fetchHostelById = async () => {
    const response = await fetch(
      `${
        import.meta.env.VITE_REACT_BASE_BACKEND_URL
      }/facility/hostel/h${hostel_no}.md`
    );

    if (response.status === 200) {
      const data = await response.text();
      setHostelInfo(data);
      setloading(false);
    } else if (response.status === 404) {
      const data = await response.json();
      seterror(data.message);
      setloading(false);
    }
  };
  useEffect(() => {
    seterror("");
    setloading(true);
    fetchHostelById();
  }, [hostel_no]);

  if (loading) return <Loading type={"spin"} color={"#227490"} />;

  if(error)return <NotFound404/>
  return (
 
      <div className={styles.markdown}>
          <div className={styles.head_img}>
            <img src={`${import.meta.env.VITE_REACT_BASE_BACKEND_URL}/facility/hostel/h${hostel_no}.jpg`} alt="hostel image" />
          </div>
        <ReactMarkdown>{hostelInfo}</ReactMarkdown>
     
      </div>
 
  );
};
