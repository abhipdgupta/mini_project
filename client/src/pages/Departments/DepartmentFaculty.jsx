import React, { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { departmentMap } from "../../utils/departmentMap";
import { useAuth } from "../../hooks/useAuth";
import styles from "../../css/department.module.css";

export const DepartmentFaculty = () => {
  const { auth } = useAuth();

  const { department_name } = useOutletContext();

  const [facultyDetails, setFacultyDetails] = useState([]);
  const [error, seterror] = useState("");

  const fetchFacultyList = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_BASE_BACKEND_URL}/department/${
        departmentMap[department_name]
      }/faculty`
    );

    const data = await response.json();

    if (data.success) setFacultyDetails(data.message);
    else {
      seterror(data.message);
    }
    console.log(data);
  };

  useEffect(() => {
    fetchFacultyList();

    console.log(facultyDetails);
  }, [department_name,auth]);

  return (
    <>
      <div className={styles.profile_card_container}>
        {facultyDetails.length > 0 &&
          facultyDetails.map((faculty) => {
            return (
              <div className={styles.profile_card} key={faculty._id}>
                <div className={styles.profile_img}>
                  <img
                    src={`${import.meta.env.VITE_REACT_BASE_BACKEND_URL}${
                      faculty.profileImgPath
                    }`}
                    alt="Profile img"
                  />
                </div>
                <span>{faculty.name}</span>
                <span>{faculty.email}</span>
                <span>{faculty.phoneno}</span>
                {auth.isAuthenticated && (
                  <Link to={`/profile/f/${faculty.username}`}>
                    check profile
                  </Link>
                )}
              </div>
            );
          })}
        {error != "" && <h1>{error}</h1>}
      </div>
    </>
  );
};
