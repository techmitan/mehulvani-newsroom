import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useState } from "react";
import { baseAPI } from "../../config";
import { CircularProgress } from "@material-ui/core";

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

export default function UploadButtons({ id }) {
  const classes = useStyles();
  const [sending, setSending] = useState(false);

  let updateAdHandler = async (e) => {
    setSending(true);
    let adData = new FormData();
    let image = e.target.files[0];
    adData.append("image", image);

    const response = await fetch(`${baseAPI}/api/advertisement/${id}`, {
      method: "PUT",
      body: adData,
    });
    const data = await response.json();
    if (data.success) {
      setSending(false);
      window.location.reload();
    }
  };

  return (
    <div className={classes.root}>
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        single
        type="file"
        onChange={(e) => {
          updateAdHandler(e);
        }}
      />

      {sending ? (
        <CircularProgress />
      ) : (
        <label htmlFor="contained-button-file">
          <Button variant="contained" color="primary" component="span">
            Change Ad
          </Button>
        </label>
      )}

      {!sending && <div>Ready to send files!!!</div>}
    </div>
  );
}
