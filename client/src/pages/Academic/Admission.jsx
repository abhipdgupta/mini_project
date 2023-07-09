import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import styles from "../../css/markdown.module.css";
import { Loading } from "../../components/Loading";

export const Admission = () => {
  const { year } = useParams();

  const [admissionInfo, setadmissionInfo] = useState("");
  const [error, seterror] = useState("");
  const [loading, setloading] = useState(true);
//   console.log("hostel",admissionInfo);
  const fetchDetails = async () => {

    const response = await fetch(
      `${import.meta.env.VITE_REACT_BASE_BACKEND_URL}/admission/admission.md`
    );
    console.log(response);    
    if (response.status === 200) {

      const data = await response.text();
      setadmissionInfo(data);
      setloading(false);
    } else if (response.status === 404) {
    //   const data = await response;
      setadmissionInfo("")
      seterror(response.status+" "+response.statusText);
      setloading(false);
    }
  };
  useEffect(() => {
    seterror("");
    setloading(true);
    setadmissionInfo("")
    fetchDetails();
  }, [year]);

  if (loading) return <Loading type={"spin"} color={"#227490"} />;
  return (
    <div className={styles.markdown}>
      <ReactMarkdown>{admissionInfo}</ReactMarkdown>
      {error}
    </div>
  );
};
