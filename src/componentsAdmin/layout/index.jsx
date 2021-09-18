import React from "react";
import styles from "./style.module.css";
import Navbar from "../navbar";
import Menubar from "../menubar";

const Layout = ({ heading, children }) => {
  return (
    <>
      <Navbar />
      <div className={styles.layout_master}>
        <div className={styles.menubar}>
          <Menubar />
        </div>
        <div className={styles.main_area}>
          <div className={styles.heading}>
            <h2>{heading}</h2>
          </div>
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
