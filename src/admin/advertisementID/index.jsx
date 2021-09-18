import React from "react";
import Layout from "../../componentsAdmin/layout";
import styles from "./style.module.css";
import Button from "@material-ui/core/Button";
import { CircularProgress } from "@material-ui/core";

import { useEffect, useState } from "react";
import { baseAPI } from "../../config";
import { useParams } from "react-router";
import Upload from "./upload";
import { TextField } from "@material-ui/core";

const Advertisement = () => {
  let { id } = useParams();
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [adLink, setAdLink] = useState("");
  const [sending, setSending] = useState(false);

  const [preview, setPreview] = useState("");

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
    const imageURL = URL.createObjectURL(e.target.files[0]);
    setPreview(imageURL);
  };

  const getAds = async () => {
    const response = await fetch(`${baseAPI}/api/advertisement/${id}`);
    const data = await response.json();
    setPreview(data.advert.imageUrl);
    setAdLink(data.advert.ad_url);
    setLoading(false);
  };

  let updateAdHandler = async () => {
    setSending(true);
    let adData = new FormData();

    adData.append("image", image);
    adData.append("ad_url", adLink);

    const response = await fetch(`${baseAPI}/api/advertisement/${id}`, {
      method: "PUT",
      body: adData,
    });
    const data = await response.json();
    if (data.success) {
      setSending(false);
    }
  };

  useEffect(() => {
    getAds();
  }, [id]);

  if (loading) {
    return (
      <Layout heading={"Advertisements"}>
        <div className={styles.grid}>Loading...</div>
      </Layout>
    );
  } else {
    return (
      <Layout heading={"Advertisements"}>
        <TextField
          id="outlined-basic"
          label="Advertisement Link"
          variant="outlined"
          fullWidth
          style={{ marginBottom: "20px" }}
          value={adLink}
          onChange={(e) => {
            setAdLink(e.target.value);
          }}
        />

        <div className={styles.grid}>
          <img src={preview} alt="advert" />
        </div>

        <Upload imageHandler={imageHandler} />

        <div style={{ marginBottom: "30px" }}></div>

        {sending ? (
          <CircularProgress />
        ) : (
          <Button
            variant="contained"
            color="primary"
            style={{ marginRight: "15px" }}
            onClick={updateAdHandler}
          >
            Save Now
          </Button>
        )}
      </Layout>
    );
  }
};

export default Advertisement;
