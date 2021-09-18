import React from "react";
import styles from "./style.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const MenuList = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className={styles.menubar}>
      <ul>
        {(user.role === "admin" || user.role === "reporter") && (
          <>
           
            <a href="http://cg24x7.news" target="_blank">
              <li>Visit Site</li>
            </a>
            <Link to="/dashboard">
              <li>Dashboard</li>
            </Link>
            <Link to="/dashboard/create-news">
              <li>Add News</li>
            </Link>
            <Link to="/dashboard/my-news">
              <li>My News</li>
            </Link>
            <Link to="/dashboard/my-profile">
              <li>My Profile</li>
            </Link>{" "}
          </>
        )}

        {user.role === "admin" && (
          <>
            {" "}
            <Link to="/dashboard/category">
              <li>News Categories</li>
            </Link>
            <Link to="/dashboard/all-news">
              <li>All News</li>
            </Link>
            <Link to="/dashboard/reporters">
              <li>Reporters</li>
            </Link>
            <Link to="/dashboard/youtube">
              <li>Youtube</li>
            </Link>
            <Link to="/dashboard/poll">
              <li>Poll</li>
            </Link>
            <Link to="/dashboard/advertisements">
              <li>Advertisements</li>
            </Link>
          </>
        )}
      </ul>
    </div>
  );
};

export default MenuList;
