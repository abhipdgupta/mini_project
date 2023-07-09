import React from "react";

import { FacultyProfile } from "./FacultyProfile";
import { StudentProfile } from "./StudentProfile";
import { useParams } from "react-router-dom";

export const Profile = () => {
  let { n } = useParams();
  if (n == "f") return <FacultyProfile />;
  else if (n == "s") return <StudentProfile />;
};
