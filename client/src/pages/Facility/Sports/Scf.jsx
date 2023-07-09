import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Loading } from "../../../components/Loading";
import styles from "../../../css/markdown.module.css";
import remarkGfm from "remark-gfm";

export const Scf = () => {
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchInfo = async () => {
    const response = await fetch(
      `${
        import.meta.env.VITE_REACT_BASE_BACKEND_URL
      }/facility/sports-cultural-facility/scf.md`
    );

    if (response.status === 200) {
      const data = await (await response.text()).replaceAll('{backend_url}',`${import.meta.env.VITE_REACT_BASE_BACKEND_URL}`);
      setInfo(data);
      setLoading(false);
    } else {
      console.log(response);
      setError(`${response.status}  ${response.statusText}`);
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
            // src={`${
            //   import.meta.env.VITE_REACT_BASE_BACKEND_URL
            // }/facility/hostel/h${""}.jpg`}
            src="https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1907&q=80"
            alt="hostel image"
          />
        </div>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{info}</ReactMarkdown>
        {error}
      </div>
    </div>
  );
};
