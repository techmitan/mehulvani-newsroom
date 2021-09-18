import React from "react";
import styles from "./style.module.css";

const Input = ({ title, onChange, placeholder }) => {
  return (
    <div className={styles.input_area}>
      <h4>{title}</h4>
      <input type="text" onChange={onChange} placeholder={placeholder} />
    </div>
  );
};



export default Input;
