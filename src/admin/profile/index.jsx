import React from "react";

import { baseAPI } from "../../config";
import Layout from "../../componentsAdmin/layout";

import { TextField } from "@material-ui/core";

import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import CircularProgress from "@material-ui/core/CircularProgress";

import { useState } from "react";
import Upload from "./upload";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);

  const [fullName, setFullName] = useState(user.full_name);
  const [image, setImage] = useState("");
  const [email, setEmail] = useState(user.email);
  const [sending, setSending] = useState(false);
  const [preview, setPreview] = useState(user.profileImageUrl);

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
    const imageURL = URL.createObjectURL(e.target.files[0]);
    setPreview(imageURL);
  };

  const updateProfileHandler = async () => {
    setSending(true);
    let userData = new FormData();
    userData.append("full_name", fullName);
    userData.append("image", image);
    userData.append("email", email);

    const response = await fetch(
      `${baseAPI}/api/user/${user._id}/update-profile`,
      {
        method: "PUT",
        body: userData,
      }
    );
    const data = await response.json();
    if (data.success) {
      setSending(false);
      window.location.reload();
    }
  };

  return (
    <Layout heading={"My Profile"}>
      <TextField
        id="outlined-basic"
        label="Full Name"
        variant="outlined"
        fullWidth
        style={{ marginBottom: "20px" }}
        value={fullName}
        onChange={(e) => {
          setFullName(e.target.value);
        }}
      />

      <TextField
        id="outlined-basic"
        label="Email"
        variant="outlined"
        fullWidth
        style={{ marginBottom: "20px" }}
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />

      {preview && (
        <div>
          <img src={preview} alt="profilepic" style={{ maxWidth: "180px" }} />
        </div>
      )}

      <Upload imageHandler={imageHandler} />

      <div style={{ marginBottom: "30px" }}></div>

      {sending ? (
        <CircularProgress />
      ) : (
        <Button
          variant="contained"
          color="primary"
          endIcon={<SaveIcon />}
          style={{ marginRight: "15px" }}
          onClick={updateProfileHandler}
        >
          Update Profile
        </Button>
      )}
    </Layout>
  );
};

export default Profile;
