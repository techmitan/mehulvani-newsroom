import React from "react";
import styles from "./style.module.css";

const Alert = ({ message, type }) => {
  if (type === "success") {
    return <div className={styles.success}>{message}</div>;
  }
  if (type === "error") {
    return <div className={styles.error}>{message}</div>;
  }
};

export default Alert;
