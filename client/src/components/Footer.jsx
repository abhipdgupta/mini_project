import React from "react";
import styles from "../css/footer.module.css";
import { Link, NavLink } from "react-router-dom";
const Footer = () => {
  return (
    <div className={styles.footer_container}>
    
      <div className={styles.top}>
        <div className={styles.branch}>
          <span>B Tech Department</span>
          <Link to="/department/computer-science-and-engineering">
            -Computer Science
          </Link>
          <NavLink to="/department/mechanical-engineering">
            -Mechanical Engineering
          </NavLink>
          <NavLink to="/department/civil-engineering">
            -Civil Engineering
          </NavLink>
          <NavLink to="/department/electrical-engineering">
            -Electrical Engineering
          </NavLink>
          <NavLink to="/department/instrumentation-engineering">
            -Instrumentation Engineering
          </NavLink>
        </div>
        <div className={styles.branch}>
          <span>Facility</span>
          <Link to="/facility/hostel">
            -Hostel
          </Link>
          <NavLink to="/facility/national-cadet-corps">
            -National Cadet Corps
          </NavLink>
          <NavLink to="/facility/library">
            -Library
          </NavLink>
          <NavLink to="/facility/bus-service">
            -Bus Service
          </NavLink>
          <NavLink to="/facility/guest-house-canteen">
            -Guest house
          </NavLink>
        </div>
        <div className={styles.branch}>
          <span>Important Links</span>
          <Link to="/traning-and-placement-cell">
            -TPC CELL
          </Link>
          <NavLink to="/department/mechanical-engineering">
            -Mechanical Engineering
          </NavLink>
          <NavLink to="/academic/result/2023">
            -Result 2023
          </NavLink>
          <NavLink to="/signup/student">
            -Student Signup
          </NavLink>
          <NavLink to="/signup/faculty">
            -Faculty Signup
          </NavLink>
        </div>
      </div>

      <div className={styles.down}>
        <span>	&#169; Copyright Abhishek Prasad Gupta Pranayan Sonowal Nikhil Gautam</span>
        <span> This is a kind of clone of Jorhat Engineering College website build as a 6th semester Mini Project</span>
      </div>
    </div>
  );
};

export default Footer;
