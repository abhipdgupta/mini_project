import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import styles from "../../css/markdown.module.css";
import { Loading } from "../../components/Loading";

export const Result = () => {
  const { year } = useParams();

  const [resultInfo, setResultInfo] = useState("");
  const [error, seterror] = useState("");
  const [loading, setloading] = useState(true);
//   console.log("hostel",resultInfo);
  const fetchResultByYear = async () => {

    const response = await fetch(
      `${import.meta.env.VITE_REACT_BASE_BACKEND_URL}/result/result_${year}.md`
    );
    console.log(response);    
    if (response.status === 200) {

      const data = await response.text();
      setResultInfo(data);
      setloading(false);
    } else if (response.status === 404) {
    //   const data = await response;
      setResultInfo("")
      seterror(response.status+" "+response.statusText);
      setloading(false);
    }
  };
  useEffect(() => {
    seterror("");
    setloading(true);
    setResultInfo("")
    fetchResultByYear();
  }, [year]);

  if (loading) return <Loading type={"spin"} color={"#227490"} />;
  return (
    <div className={styles.markdown}>
      <ReactMarkdown>{resultInfo}</ReactMarkdown>
      {error}
    </div>
  );
};
