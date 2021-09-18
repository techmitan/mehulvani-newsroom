import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
}));

export default function UploadButtons({ imageHandler }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        single
        type="file"
        onChange={(e) => {
          imageHandler(e);
        }}
      />

      <label htmlFor="contained-button-file">
        <Button variant="outlined" color="secondary" component="span">
          Change Ad
        </Button>
      </label>
    </div>
  );
}


