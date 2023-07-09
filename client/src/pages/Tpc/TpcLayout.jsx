import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import styles from "../../css/tpc.module.css"

export const TpcLayout = () => {
  return (
    <div className={styles.tpc_container}>
      <div className={styles.sidelinks}>     
      <div className={styles.links}>
      <NavLink to="">T&P cell </NavLink>
        <NavLink to="message-from-tpo">Message from TPO </NavLink>
        <NavLink to="facility">Facility </NavLink>
        <NavLink to="placement">Placement</NavLink>
        <NavLink to="members">Members</NavLink>
        <NavLink to="events">Events</NavLink>
        <NavLink to="notice">Notice</NavLink>
      </div>
      </div>
      <div  className={styles.wrapper}>
        <Outlet/>
      </div>
    </div>
  );
};
