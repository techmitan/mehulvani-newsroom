import React from "react";
import styles from "./style.module.css";

const Button = ({ onClick, type, children }) => {
  if (type === "loading") {
    return (
      <div className={styles.btnLoading}>
        <button disabled>Sending...</button>
      </div>
    );
  } else {
    return (
      <div className={styles.btn}>
        <button onClick={onClick}>{children}</button>
      </div>
    );
  }
};

export default Button;
