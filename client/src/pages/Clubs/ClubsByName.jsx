import React, { useEffect, useState } from "react";
import { Link, NavLink, useOutletContext, useParams } from "react-router-dom";
// import { departmentMap } from "../../utils/departmentMap";
import { Loading } from "../../components/Loading";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from 'rehype-raw';
import styles from  "../../css/markdown.module.css"

export const ClubsByName = () => {
  const [clubInfo, setClubInfo] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { club_name } = useParams();
  const fetchClubDetails = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_BASE_BACKEND_URL}/clubs/${club_name}/${club_name}.md`,
      {
        method: "GET",
      }
    );
    let data;
    if (response.status === 200) {
	  data=await (await response.text()).replaceAll('{backend_url}',`${import.meta.env.VITE_REACT_BASE_BACKEND_URL}`)
    setClubInfo(data);
      setLoading(false);

    } else if (response.status === 500) {
      setError("INTERNAL SERVER ERROR");
    }
  };

  useEffect(() => {
    fetchClubDetails();
	  setLoading(true)
	  setError('')
  }, [club_name]);

  if(error)return <h1>{error}</h1>
  if (loading) return <Loading type={"spin"} color={"#227490"} />;

  return (
    <div className={styles.markdown}>
      <ReactMarkdown   remarkPlugins={[remarkGfm]}>{clubInfo}</ReactMarkdown>
    </div>
  );
};
