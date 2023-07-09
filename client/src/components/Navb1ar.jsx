import React from "react";

import styles from "../css/Nav_bar.module.css";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
export const Navbar = () => {
  const { auth, setauth } = useAuth();
  const handleLogout = () => {
    setauth({
      isAutheticated: false,
      role: [],
      tokenid: "",
      username: "",
      email: "",
    });
    localStorage.removeItem("tokenid");
  };
  return (
    <nav>
      <div className={styles.logo}>
        <span>Logo</span>
      </div>
      <div className={styles.nav_items}>
        <ul>
          <li>
            <Link to="/"> Home</Link>
          </li>
          <li>
            <Link to="/department"> Departments</Link>
          </li>
          <li>
            <Link to="/news-events"> News-Events</Link>
          </li>
          <li>
            <Link to="/notice"> Notice</Link>
          </li>
          <li>
            <Link to="/admission"> Admission</Link>
          </li>
          <li>
            <Link to="/contact"> Contact</Link>
          </li>
          <li>
            <Link to="/result"> Results</Link>
          </li>
          <li>
            <Link to="/signup"> signup</Link>
          </li>
          <li>
            <Link to="/facility/hostel"> hostel</Link>
          </li>
        </ul>
      </div>
      <div className={styles.islogin}>
        {auth?.isAuthenticated ? (
          <div>
            <span onClick={handleLogout}>Logout</span>
            {auth.role.includes("FACULTY") ? (
              <span>
                <Link to={`/profile/f/${auth.username}`}>{auth.username}</Link>
              </span>
            ) : (
              auth.role.includes("STUDENT") && (
                <span>
                  <Link to={`/profile/s/${auth.username}`}>
                    {auth.username}
                  </Link>
                </span>
              )
            )}
          </div>
        ) : (
          <span>
            <Link to="/login">Login</Link>
          </span>
        )}
      </div>
    </nav>
  );
};

