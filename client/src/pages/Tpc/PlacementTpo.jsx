import React, { useEffect, useState } from "react";
import { Link, NavLink, useOutletContext, useParams } from "react-router-dom";
// import { departmentMap } from "../../utils/departmentMap";
import { Loading } from "../../components/Loading";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import Db from "../../assets/db.jpg";
import styles from "../../css/tpc.module.css";

export const PlacementTpo = () => {
  const [tpcInfo, setTpcInfo] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const fetchTpcDetails = async () => {
    const response = await fetch(
      `${
        import.meta.env.VITE_REACT_BASE_BACKEND_URL
      }/traning-and-placement-cell/placement.md`,
      {
        method: "GET",
      }
    );
    let data;
    if (response.status === 200) {
      data = await (
        await response.text()
      ).replaceAll(
        "{backend_url}",
        `${import.meta.env.VITE_REACT_BASE_BACKEND_URL}`
      );
      setTpcInfo(data);
      setLoading(false);
    } else if (response.status === 500) {
      setError("INTERNAL SERVER ERROR");
    }
  };
  useEffect(() => {
    fetchTpcDetails();
    setLoading(true);
    setError("");
  }, []);

  if (error) return <h1>{error}</h1>;
  if (loading) return <Loading type={"spin"} color={"#227490"} />;

  return (
    <div className={styles.tpc_markdown}>
    
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{tpcInfo}</ReactMarkdown>
    </div>
  );
};
