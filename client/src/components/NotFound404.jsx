import React from "react";
import transparent_logo_01 from "../assets/transparent_logo_jec_01.png";
import styles from "../css/notfound.module.css";
import { Link } from "react-router-dom";
export const NotFound404 = () => {
  return (
    <div className={styles.not_found_container}>
      <div className={styles.logo}>
        <img src={transparent_logo_01} alt="LOGO JEC" />
      </div>
      <div className={styles.msg_404}>
        <h1>OOPS!</h1>
        <p>404 Page Not Found </p>
      </div>
    </div>
  );
};
