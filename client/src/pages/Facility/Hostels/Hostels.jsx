
import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../../../css/hostel.module.css";  
export const Hostels = () => {
  return (
    <div className={styles.hostel_container}>
      <div className={styles.hostel_wrapper}>
        <div className={styles.btech}>
          <div>
            <NavLink to="1" end>
              Hostel-1
            </NavLink>
            <div>
              <NavLink to="2" end >Hostel-2 </NavLink>
            </div>
            <div>
              <NavLink to="3" end >Hostel-3 </NavLink>
            </div>
            <div>
              <NavLink to="4" end >Hostel-4 </NavLink>
            </div>
            <div>
              <NavLink to="5" end >Hostel-5 </NavLink>
            </div>
            <div>
              <NavLink to="6" end >Hostel-6 </NavLink>
            </div>
            <div>
              <NavLink to="7" end >Hostel-7 </NavLink>
            </div>
            <div>
              <NavLink to="8" end >Hostel-8 </NavLink>
            </div>
            <div>
              <NavLink to="9" end >Hostel-9 </NavLink>
            </div>
            <div>
              <NavLink to="10" end >Hostel-10 </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
