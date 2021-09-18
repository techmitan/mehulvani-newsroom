import React from "react";

import { baseAPI } from "../../config";
import Layout from "../../componentsAdmin/layout";

import { TextField } from "@material-ui/core";

import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import CircularProgress from "@material-ui/core/CircularProgress";
import PollTable from "./pollTable";

import { useState, useEffect } from "react";

const Poll = () => {
  const [question, setQuestion] = useState("");
  const [polls, setPolls] = useState([]);
  const [sending, setSending] = useState(false);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    const getPolls = async () => {
      const response = await fetch(`${baseAPI}/api/poll`);
      const data = await response.json();
      setPolls(data.polls);
    };
    getPolls();
  }, [updated]);

  const addPoll = async () => {
    setSending(true);
    const response = await fetch(`${baseAPI}/api/poll`, {
      method: "POST",
      body: JSON.stringify({ question: question }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setUpdated(!updated);
    setSending(false);
  };

  return (
    <Layout heading={"Polls"}>
      <h3 style={{ marginBottom: "20px" }}>Set Question for Poll</h3>
      <TextField
        id="outlined-basic"
        label="Question"
        variant="outlined"
        fullWidth
        style={{ marginBottom: "20px" }}
        value={question}
        onChange={(e) => {
          setQuestion(e.target.value);
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
            addPoll();
          }}
        >
          Create Poll
        </Button>
      )}

      <div style={{ marginBottom: "30px" }}></div>

      <PollTable data={polls} />
    </Layout>
  );
};

export default Poll;
