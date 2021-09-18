import React from "react";

import { baseAPI } from "../../config";
import Layout from "../../componentsAdmin/layout";

import { TextField } from "@material-ui/core";

import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import CircularProgress from "@material-ui/core/CircularProgress";

import { useState, useEffect } from "react";

const Youtube = () => {
  const [channel, setChannel] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [video, setVideo] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const getChannel = async () => {
      const response = await fetch(`${baseAPI}/api/video`);
      const data = await response.json();
      return data;
    };

    getChannel().then((data) => {
      setChannel(data.video.channelId);
      setApiKey(data.video.api_key);
      setVideo(data.video.video);
    });
  }, []);

  const updateChannel = async (content) => {
    setSending(true);
    const response = await fetch(
      `${baseAPI}/api/video/612b441f45596489772bbb66`,
      {
        method: "PUT",
        body: JSON.stringify(content),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setChannel(data.video.channelId);
    setApiKey(data.video.api_key);
    setVideo(data.video.video);
    setSending(false);
  };

  return (
    <Layout heading={"Youtube"}>
      <h3 style={{ marginBottom: "20px" }}>Youtube Channel</h3>
      <TextField
        id="outlined-basic"
        label="Channel ID"
        variant="outlined"
        fullWidth
        style={{ marginBottom: "20px" }}
        value={channel}
        onChange={(e) => {
          setChannel(e.target.value);
        }}
      />
      <TextField
        id="outlined-basic"
        label="API key"
        variant="outlined"
        fullWidth
        style={{ marginBottom: "20px" }}
        value={apiKey}
        onChange={(e) => {
          setApiKey(e.target.value);
        }}
      />
      <p>Do not delete the api key</p>

      <h3 style={{ marginBottom: "20px", marginTop: "40px" }}>
        Youtube Video for Sidebar
      </h3>
      <TextField
        id="outlined-basic"
        label="Video Link"
        variant="outlined"
        fullWidth
        style={{ marginBottom: "20px" }}
        value={video}
        onChange={(e) => {
          setVideo(e.target.value);
        }}
      />

      {sending ? (
        <CircularProgress />
      ) : (
        <Button
          variant="contained"
          color="primary"
          endIcon={<SaveIcon />}
          style={{ marginRight: "15px" }}
          onClick={() => {
            let content = {
              channelId: channel,
              api_key: apiKey,
              video,
            };
            updateChannel(content);
          }}
        >
          Save Now
        </Button>
      )}
    </Layout>
  );
};

export default Youtube;
