import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import { useState } from "react";
import Upload from "./upload";
import { baseAPI } from "../../config";
import { CircularProgress } from "@material-ui/core";

export default function FormDialog({ title, id, imageProp }) {
  const [open, setOpen] = useState(false);
  const [catTitle, setCatTitle] = useState(title);
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState(imageProp);
  const [sending, setSending] = useState(false);

  const updateHandler = async () => {
    let categoryData = new FormData();
    categoryData.append("title", catTitle);
    categoryData.append("image", image);

    const response = await fetch(`${baseAPI}/api/category/${id}`, {
      method: "PUT",
      body: categoryData,
    });
    const data = await response.json();
    if (data.success) {
      setSending(false);
      window.location.reload();
    }
  };

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
    const imageURL = URL.createObjectURL(e.target.files[0]);
    setPreview(imageURL);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setPreview(imageProp);
    setOpen(false);
  };

  return (
    <div>
      <IconButton aria-label="delete" color="primary" onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
      >
        <DialogTitle id="form-dialog-title">Edit Category</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText> */}
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Category"
            type="text"
            fullWidth
            value={catTitle}
            onChange={(e) => {
              setCatTitle(e.target.value);
            }}
          />

          <div style={{ marginBottom: "30px" }}></div>

          <div style={{ maxWidth: "150px" }}>
            {preview && <img src={preview} alt="image" />}
          </div>

          <Upload imageHandler={imageHandler} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          {sending ? (
            <CircularProgress />
          ) : (
            <Button onClick={updateHandler} color="secondary">
              Update
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
