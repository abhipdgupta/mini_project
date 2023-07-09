import React from "react";
import { useParams } from "react-router-dom";

export const StudentProfile = () => {
  let { username } = useParams();
  return (
    <>
      <div>Profile</div>
      <h1>{username}</h1>
    </>
  );
};
