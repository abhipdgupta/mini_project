import React, { useEffect, useState } from "react";
import { Link, NavLink, useOutletContext, useParams } from "react-router-dom";
import styles from "../../css/department.module.css";
import { departmentMap } from "../../utils/departmentMap";
import { Loading } from "../../components/Loading";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw"


export const DepartmentLabs = () => {
  const [departmentLabInfo, setdepartmentLabInfo] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { department_name } = useOutletContext();

  const fetchDepartmentDetails = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_BASE_BACKEND_URL}/department/labs/${
        departmentMap[department_name]
      }.md`,
      {
        method: "GET",
      }
    );
    let data;
    if (response.status === 200) {
	  data=await response.text()	
      setdepartmentLabInfo(data);
      setLoading(false);
      // console.log(data);
    } else if (response.status === 500 || response.status === 404 ) {
      setError("UPDATING SOON");
    }
  };
  useEffect(() => {
    fetchDepartmentDetails();
	setLoading(true)
	setError('')
  }, [department_name]);

  if(error)return <h1>{error}</h1>
  if (loading) return <Loading type={"spin"} color={"#227490"} />;

  return (
    <div className={styles.department_info}>
      <ReactMarkdown  rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>{departmentLabInfo}</ReactMarkdown>
    </div>
  );
};
