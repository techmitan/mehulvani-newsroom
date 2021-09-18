import React from "react";
import styles from "./style.module.css";
// import UserMenu from "../userMenu";
import HamBurger from "../hamBurger";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const Navbar = () => {
  const logOutHandler = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.nav_container}>
        <div className={styles.nav_left}>
          <div className={styles.ham}>
            <HamBurger />
          </div>

          <Link to="/">
            <div className={styles.logo}>
              <img src="/logo.JPG" alt="logo" />
            </div>
          </Link>
        </div>

        <Button
          variant="contained"
          color="secondary"
          endIcon={<ExitToAppIcon />}
          onClick={logOutHandler}
        >
          Log Out
        </Button>
      </div>
      {/* user avatar */}
    </div>
  );
};

export default Navbar;
