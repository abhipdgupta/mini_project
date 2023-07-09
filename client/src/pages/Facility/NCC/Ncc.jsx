import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Loading } from "../../../components/Loading";
import styles from "../../../css/markdown.module.css";
import remarkGfm from "remark-gfm";

export const Ncc = () => {
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchInfo = async () => {
    const response = await fetch(
      `${
        import.meta.env.VITE_REACT_BASE_BACKEND_URL
      }/facility/national-cadet-corps/ncc.md`
    );

    if (response.status === 200) {
      const data = await response.text();
      setInfo(data);
      setLoading(false);
    } else {
      setError(response.status);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (info === "") fetchInfo();
  }, [info]);
  if (loading) return <Loading type={"spin"} color={"#227490"} />;
  return (
    <div>
      <div className={styles.markdown}>
        <div className={styles.head_img}>
          <img
            src={`${
              import.meta.env.VITE_REACT_BASE_BACKEND_URL
            }/facility/national-cadet-corps/ncc.jpg`}
            alt="hostel image"
          />
        </div>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{info}</ReactMarkdown>
        {error}
      </div>
    </div>
  );
};
