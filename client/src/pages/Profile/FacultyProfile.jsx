import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import styles from "../../css/profile.module.css";
import { Link, useParams } from "react-router-dom";
import deleteIcon from "../../assets/delete_icon.png";
import {Loading} from "../../components/Loading"

export const FacultyProfile = () => {
  const { auth } = useAuth();
  const [facultyinfo, setfacultyinfo] = useState({});
  const [loading, setloading] = useState(true);
  const [error_msg, seterror_msg] = useState(null);

  const [isPageAdmin, setIsPageAdmin] = useState(false);
  const  { username } = useParams();

  const fetchFacultyInfo = async () => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_REACT_BASE_BACKEND_URL
        }/faculty/subject-teaching/${username}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${auth.tokenid}`,
          },
        }
      );

      const data = await response.json();
      if (data.success) {
        console.log("data", data);

        setfacultyinfo(data.message);
        setloading(false);
        seterror_msg(null);
      } else {
        seterror_msg(data.message);
      }
    } catch (error) {
      console.error("fetch erorr :", error);
    }
  };

  useEffect(() => {
    // if (Object.keys(facultyinfo).length === 0 && auth.isAuthenticated)
      fetchFacultyInfo();
      setloading(true)
      seterror_msg('')
    if (auth.username === username) setIsPageAdmin(true);

    console.log("isPageAdmin :", isPageAdmin);
  }, [auth,username]);

  if (!auth.isAuthenticated) return <h1>NOT AUTHENTICATED</h1>;

  if (error_msg) return <h1>{error_msg}</h1>;

  if(loading)return <Loading type={"spin"} color={"#227490"} />

  return (
    <div className={styles.profile_container}>
      <div className={styles.profile_wrapper}>
        <UserInfo
          setfacultyinfo={setfacultyinfo}
          facultyinfo={facultyinfo}
          isPageAdmin={isPageAdmin}
        />
        <UserSubjects
          facultyinfo={facultyinfo}
          setfacultyinfo={setfacultyinfo}
          isPageAdmin={isPageAdmin}
        />
      </div>
    </div>
  );
};

const UserSubjects = ({ facultyinfo, setfacultyinfo, isPageAdmin }) => {
  const { auth } = useAuth();

  const myref = useRef();
  const [exams, setexams] = useState([]);
  const [subjectClick, setsubjectClick] = useState("");
  const [examClick, setexamClick] = useState(false);
  const [resourceClick, setresourceClick] = useState(false);
  const [resources, setresources] = useState([]);

  const [examsResult, setExamsResult] = useState({
    exam_result_name: "",
    exam_result_file: null,
  });
  const [resourceMaterial, setResourceMaterial] = useState({
    resource_title: "",
    resource_file: null,
  });
  const [subject, setSubject] = useState({ subject_name: "" });

  const scrollToId = () => {
    myref.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "start",
    });
  };
  const handleExamClick = (e, subject) => {
    setresources([]);
    setexams(subject.exams);
    setsubjectClick(subject.name);
    setexamClick(true);
    setresourceClick(false);
  };

  const handleResourceClick = (e, subject) => {
    setexams([]);
    setresources(subject.resources);
    setsubjectClick(subject.name);
    setexamClick(false);
    setresourceClick(true);
  };

  const addExam = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("exam_name", examsResult.exam_result_name);
    formData.append("exam_file", examsResult.exam_result_file);
    formData.append("exam_subject", subjectClick);

    const requestOptions = {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${auth.tokenid}`,
      },
    };

    const response = await fetch(
      `${import.meta.env.VITE_REACT_BASE_BACKEND_URL}/faculty/exam`,
      requestOptions
    );
    const data = await response.json();

    if (data.success) {
      setfacultyinfo({
        ...facultyinfo,
        teachSubjects: data.message.teachSubjects,
      });
      setExamsResult({
        ...examsResult,
        exam_result_name: "",
      });
    }
  };

  const addResource = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("resource_title", resourceMaterial.resource_title);
    formData.append("resource_file", resourceMaterial.resource_file);
    formData.append("resource_subject", subjectClick);

    const requestOptions = {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${auth.tokenid}`,
      },
    };

    const response = await fetch(
      `${import.meta.env.VITE_REACT_BASE_BACKEND_URL}/faculty/resource`,
      requestOptions
    );
    const data = await response.json();

    if (data.success) {
      setfacultyinfo({
        ...facultyinfo,
        teachSubjects: data.message.teachSubjects,
      });
    }
  };
  const addSubject = async (e) => {
    e.preventDefault();

    const requestOptions = {
      method: "POST",
      body: JSON.stringify(subject),
      headers: {
        Authorization: `Bearer ${auth.tokenid}`,
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(
      `${import.meta.env.VITE_REACT_BASE_BACKEND_URL}/faculty/subject`,
      requestOptions
    );
    const data = await response.json();

    if (data.success) {
      setfacultyinfo({
        ...facultyinfo,
        teachSubjects: data.message.teachSubjects,
      });
    }
  };

  const handleDeleteSubject = async (e, subject_id) => {
    const requestOptions = {
      method: "DELETE",
      body: JSON.stringify({ subject_id: subject_id }),
      headers: {
        Authorization: `Bearer ${auth.tokenid}`,
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(
      `${import.meta.env.VITE_REACT_BASE_BACKEND_URL}/faculty/subject`,
      requestOptions
    );

    const data = await response.json();
    if (data.success) {
      setfacultyinfo({
        ...facultyinfo,
        teachSubjects: data.message.teachSubjects,
      });
    }
  };
  const handleDeleteExam = async (e, exam_id) => {
    const requestOptions = {
      method: "DELETE",
      body: JSON.stringify({ exam_id: exam_id }),
      headers: {
        Authorization: `Bearer ${auth.tokenid}`,
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(
      `${import.meta.env.VITE_REACT_BASE_BACKEND_URL}/faculty/exam`,
      requestOptions
    );

    const data = await response.json();
    console.log("data exam ", data);
    if (data.success) {
      setfacultyinfo({
        ...facultyinfo,
        teachSubjects: data.message.teachSubjects,
      });
      setexamClick(false);
      setresourceClick(false);
    }
  };
  const handleDeleteResource = async (e, resource_id) => {
    const requestOptions = {
      method: "DELETE",
      body: JSON.stringify({ resource_id: resource_id }),
      headers: {
        Authorization: `Bearer ${auth.tokenid}`,
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(
      `${import.meta.env.VITE_REACT_BASE_BACKEND_URL}/faculty/resource`,
      requestOptions
    );

    const data = await response.json();
    if (data.success) {
      setfacultyinfo({
        ...facultyinfo,
        teachSubjects: data.message.teachSubjects,
      });
      setexamClick(false);
      setresourceClick(false);
    }
  };
  useEffect(() => {
    const subjectObj = facultyinfo.teachSubjects.find(
      (subject) => subject.name === subjectClick
    );
    if (subjectObj) {
      setexams(subjectObj.exams);
      setresources(subjectObj.resources);
    }
    setSubject({ subject_name: "" });
  }, [facultyinfo, subjectClick]);
  useLayoutEffect(() => {
    if (exams.length > 0 || resources.length > 0) {
      scrollToId();
    }
  }, [exams, resources]);
  return (
    <div>
      <div className={styles.subjects_container}>
        <h1 className={styles.sec_title}>Subjects Teach</h1>
        <div className={styles.subjects_wrapper}>
          {facultyinfo.teachSubjects.map((subject) => {
            return (
              <div className={styles.subject_item} key={subject._id}>
                <h2>{subject.name}</h2>
                <div onClick={(e) => handleExamClick(e, subject)}>
                  <Link>View Exam Result</Link>
                </div>
                <div onClick={(e) => handleResourceClick(e, subject)}>
                  <Link>View Resources</Link>
                </div>
                {isPageAdmin && (
                  <div
                    onClick={(e) => handleDeleteSubject(e, subject._id)}
                    className={styles.deleteIcon}
                  >
                    <img src={deleteIcon} alt="" />
                  </div>
                )}
              </div>
            );
          })}
          {isPageAdmin && (
            <div className={styles.form_item}>
              <form onSubmit={addSubject}>
                <label>Subject Name :</label>
                <input
                  type="text"
                  name="subject_name"
                  value={subject.subject_name}
                  onChange={(e) => setSubject({ subject_name: e.target.value })}
                />
                <button type="submit">Add Subject </button>
              </form>
            </div>
          )}
        </div>
      </div>

      <div ref={myref}>
        {examClick && (
          <div className={styles.exams_container}>
            <h2 className={styles.sec_title}>
              Exams result for {subjectClick}{" "}
            </h2>
            <div className={styles.exams_wrapper}>
              {exams.map((exam) => {
                return (
                  <div key={exam._id} className={styles.exam_item}>
                    <h2>{exam.name}</h2>
                    <Link
                      target="_blank"
                      to={`${
                        import.meta.env.VITE_REACT_BASE_BACKEND_URL
                      }/faculty/${exam.filePath}`}
                    >
                      View Result
                    </Link>
                    {isPageAdmin && (
                      <div
                        onClick={(e) => handleDeleteExam(e, exam._id)}
                        className={styles.deleteIcon}
                      >
                        <img src={deleteIcon} alt="" />
                      </div>
                    )}
                  </div>
                );
              })}
              {isPageAdmin && (
                <div className={styles.form_item}>
                  <form onSubmit={addExam} encType="multipart/form-data">
                    <label>Exam Name :</label>
                    <input
                      type="text"
                      name="exam_result_name"
                      value={examsResult.exam_result_name}
                      onChange={(e) =>
                        setExamsResult({
                          ...examsResult,
                          [e.target.name]: e.target.value,
                        })
                      }
                    />

                    <label className={styles.inputfile}>
                      Upload Result
                      <input
                        type="file"
                        name="exam_result_file"
                        accept="application/pdf"
                        onChange={(e) =>
                          setExamsResult({
                            ...examsResult,
                            [e.target.name]: e.target.files[0],
                          })
                        }
                      />
                    </label>
                    <button type="submit">Add Exam </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div>
        {resourceClick && (
          <div className={styles.resources_container}>
            <h2 className={styles.sec_title}>
              Course Material for {subjectClick}
            </h2>
            <div className={styles.resources_wrapper}>
              {resources.map((resource) => {
                return (
                  <div key={resource._id} className={styles.resource_item}>
                    <h2>{resource.title}</h2>
                    <Link
                      target="_blank"
                      to={`${
                        import.meta.env.VITE_REACT_BASE_BACKEND_URL
                      }/faculty/${resource.filePath}`}
                    >
                      Download Material
                    </Link>
                    {isPageAdmin && (
                      <div
                        onClick={(e) => handleDeleteResource(e, resource._id)}
                        className={styles.deleteIcon}
                      >
                        <img src={deleteIcon} alt="" />
                      </div>
                    )}
                  </div>
                );
              })}

              {isPageAdmin && (
                <div className={styles.form_item}>
                  <form onSubmit={addResource} encType="multipart/form-data">
                    <label>Resource Name :</label>
                    <input
                      type="text"
                      name="resource_title"
                      value={resourceMaterial.resource_title}
                      onChange={(e) =>
                        setResourceMaterial({
                          ...resourceMaterial,
                          [e.target.name]: e.target.value,
                        })
                      }
                    />

                    <label className={styles.inputfile}>
                      Upload Resource
                      <input
                        type="file"
                        name="resource_file"
                        accept="application/pdf"
                        onChange={(e) =>
                          setResourceMaterial({
                            ...resourceMaterial,
                            [e.target.name]: e.target.files[0],
                          })
                        }
                      />
                    </label>
                    <button type="submit">Add resource </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
const UserInfo = ({ setfacultyinfo, facultyinfo, isPageAdmin }) => {
  const { auth } = useAuth();

  const [profileImg, setProfileImg] = useState({
    name: "",
    profileImg: "",
  });
  const [profileUrl, setProfileUrl] = useState("");
  useEffect(() => {
    setProfileUrl(facultyinfo.profileImgPath);
  }, [facultyinfo]);

  const handleProfilePictureSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", profileImg.name);
    formData.append("profileImg", profileImg.profileImg);

    console.log("auth", auth);
    const requestOptions = {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${auth.tokenid}`,
      },
    };

    const response = await fetch(
      `${import.meta.env.VITE_REACT_BASE_BACKEND_URL}/faculty/profile-update`,
      requestOptions
    );
    const data = await response.json();

    if (data.success) {
      setfacultyinfo({
        ...facultyinfo,
        profileImgPath: data.message.profileImgPath,
      });
	
    }
  };
  return (
    <div className={styles.profile_details}>
      <div className={styles.profile_img}>
        <img
          src={`${import.meta.env.VITE_REACT_BASE_BACKEND_URL}/${profileUrl}?${Date.now()}`}
          alt="profile_img"
        />
      </div>

      <div className={styles.profile_info}>
        <div>
          <span>{facultyinfo.username}</span>
        </div>
        <div>
          <span>{facultyinfo.email}</span>
        </div>
        <div>
          <span>{facultyinfo.department}</span>
        </div>

        <div>
          {facultyinfo.role.map((role) => {
            return <span key={role}>{role} </span>;
          })}
        </div>

        {isPageAdmin && (
          <form onSubmit={handleProfilePictureSubmit}>
            <label>Profile image </label>
            <input
              type="file"
              name="profile_img"
              accept="image/jpg"
              onChange={(e) =>
                setProfileImg({
                  name: facultyinfo.username,
                  profileImg: e.target.files[0],
                })
              }
            />
            <button type="submit">upload</button>
          </form>
        )}
      </div>
    </div>
  );
};
