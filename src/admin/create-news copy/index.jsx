import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styles from "./style.module.css";
import { baseAPI } from "../../config";
import Layout from "../../componentsAdmin/layout";

import { TextField } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";
import SaveIcon from "@material-ui/icons/Save";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Upload from "./upload";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

const CreateNews = () => {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState([]);
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [preview, setPreview] = useState("");

  const [publishedDate, setPublishedDate] = useState(new Date());

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
    const imageURL = URL.createObjectURL(e.target.files[0]);
    // setPreview(imageURL);
    setPreview(imageURL);
  };

  const user = useSelector((state) => state.auth.user);

  const getCategories = async () => {
    const response = await fetch(`${baseAPI}/api/category`);
    const data = await response.json();
    setCategories(data.categories);
  };

  useEffect(() => {
    getCategories();
  }, []);

  const sendNewsHandler = (status) => {
    setSending(true);
    const newsData = new FormData();
    newsData.append("title", title);
    newsData.append("category", category);
    newsData.append("image", image);
    newsData.append("published_date", publishedDate);
    newsData.append("content", content);
    newsData.append("author", user._id);
    newsData.append("status", status);

    const sendNewsAPI = async () => {
      const response = await fetch(`${baseAPI}/api/news`, {
        method: "POST",
        body: newsData,
      });
      const data = await response.json();

      setSending(false);
      if (data.success) {
        // setSuccess(true);
        // setTitle("");
        // setCategory("");
        // setContent("");
        // setPublishedDate("");
        // setImage(null);
        // setPreview("");
        // window.scrollTo(0, 0);
        const newsId = data.news._id;
        history.push(`/dashboard/edit-news/${newsId}`);
      } else {
        setError(true);
        window.scrollTo(0, 0);
      }
    };
    sendNewsAPI();
  };

  return (
    <Layout heading={"Add News"}>
      <div className={styles.news_box}>
        {success && (
          <Alert severity="success" style={{ marginBottom: "20px" }}>
            Your news is created now!
          </Alert>
        )}
        {error && (
          <Alert severity="error" style={{ marginBottom: "20px" }}>
            Something went wrong. Please try again!
          </Alert>
        )}
        <TextField
          id="outlined-basic"
          label="News Title"
          variant="outlined"
          fullWidth
          style={{ marginBottom: "20px" }}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <h4>News Date</h4>
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Select News Date"
            value={publishedDate}
            onChange={(date) => {
              setPublishedDate(date);
            }}
            format="dd/MM/yyyy"
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </MuiPickersUtilsProvider>

        <div style={{ marginTop: "30px" }}></div>

        <InputLabel id="demo-simple-select-outlined">
          Select News Category
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={category}
          label="News Category"
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        >
          <MenuItem value="">
            <em>Select News Category</em>
          </MenuItem>
          {categories.map((category) => {
            return <MenuItem value={category._id}>{category.title}</MenuItem>;
          })}
        </Select>
        <div style={{ marginBottom: "30px" }}></div>
        <div className={styles.input_area}>
          <h4>News Article</h4>
          <ReactQuill value={content} onChange={setContent} />
        </div>
        <div className={styles.input_area}>
          <h4>Add Image</h4>
        </div>

        <Upload imageHandler={imageHandler} />

        {preview && (
          <div className={styles.imagePreview}>
            <img src={preview} alt="" />
          </div>
        )}

        <div style={{ marginBottom: "40px" }}></div>

        {/* buttons */}
        {sending && <CircularProgress />}

        <div></div>
        <Button
          variant="contained"
          color="primary"
          endIcon={<SaveIcon />}
          style={{ marginRight: "15px" }}
          onClick={() => {
            sendNewsHandler(false);
          }}
        >
          Save Draft
        </Button>
        {/* <Button
          variant="contained"
          color="secondary"
          endIcon={<SendIcon />}
          onClick={() => {
            sendNewsHandler(true);
          }}
        >
          Publish Now
        </Button> */}
      </div>
    </Layout>
  );
};

export default CreateNews;
