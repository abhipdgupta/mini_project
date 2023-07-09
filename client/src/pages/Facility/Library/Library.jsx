import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Loading } from "../../../components/Loading";
import styles from "../../../css/markdown.module.css";

import remarkGfm from "remark-gfm";

export const Library = () => {
  const [libraryInfo, setLibraryInfo] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchLibraryInfo = async () => {
    const response = await fetch(
      `${
        import.meta.env.VITE_REACT_BASE_BACKEND_URL
      }/facility/library/library.md`
    );

    if (response.status === 200) {
      const data = await response.text();
      setLibraryInfo(data);
      setLoading(false);
    } else {
      setError("404 NOT FOUND");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (libraryInfo === "") fetchLibraryInfo();
  }, [libraryInfo]);
  if (loading) return <Loading type={"spin"} color={"#227490"} />;
  return (
    <div>
      <div className={styles.markdown}>
        <div className={styles.head_img}>
          <img
            src={`${
              import.meta.env.VITE_REACT_BASE_BACKEND_URL
            }/facility/library/library.jpg`}
            alt="hostel image"
          />
        </div>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{libraryInfo}</ReactMarkdown>
        {error}
      </div>
    </div>
  );
};
