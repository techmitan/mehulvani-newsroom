import React from "react";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

import MenuList from "../menuList";
import styles from "./style.module.css";
import { useState } from "react";

const HamBurger = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <IconButton
        aria-label="delete"
        color="primary"
        onClick={() => {
          setOpen(true);
        }}
      >
        <MenuIcon />
      </IconButton>

      {open && (
        <div className={styles.ham_menu}>
          <div className={styles.close_icon}>
            <IconButton
              aria-label="delete"
              color="secondary"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon />
            </IconButton>
          </div>
          <MenuList />
        </div>
      )}
    </>
  );
};

export default HamBurger;
