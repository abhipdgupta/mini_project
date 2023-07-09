import React from "react";
import { Link } from "react-router-dom";
export const Signup = () => {
  return (
    <>
      <div>
        <Link to="student">Student Signup</Link>
        <br />
        <br />
        <Link to="faculty">Faculty Signup</Link>
        <br />
      </div>
      <a href="mongodb+srv://abhi:mongoabhi@cluster0.pfm6fys.mongodb.net/"> click</a>
    </>
  );
};
