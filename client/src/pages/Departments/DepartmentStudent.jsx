import React, { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { departmentMap } from "../../utils/departmentMap";
import { useAuth } from "../../hooks/useAuth";
import styles from "../../css/department.module.css";

export const DepartmentStudent = () => {
  const { auth } = useAuth();

  const { department_name } = useOutletContext();

  const [studentDetails, setstudentDetails] = useState([]);
  const [error, seterror] = useState("");

  const fetchFacultyList = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_BASE_BACKEND_URL}/department/${
        departmentMap[department_name]
      }/student`
    );

    const data = await response.json();

    if (data.success) setstudentDetails(data.message);
    else {
      seterror(data.message);
    }
    console.log(data);
  };

  useEffect(() => {
    fetchFacultyList();

    console.log(studentDetails);
  }, [department_name, auth]);

  return (
    <>
      <div className={styles.student_card_container}>
        {studentDetails.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Roll No</th>
                <th>Batch</th>

              </tr>
            </thead>
            <tbody>
              {studentDetails.map((student) => (
                <tr key={student._id}>
                  <td>{student.name}</td>
                  <td>{student.rollno}</td>
                  <td>{student.batch}</td>

                </tr>
              ))}
            </tbody>
          </table>
        )}
        {error != "" && <h1>{error}</h1>}
      </div>
    </>
  );
};
