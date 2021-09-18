import React, { useState, useRef, useEffect } from "react";
import { baseAPI } from "../../config";
import Layout from "../../componentsAdmin/layout";
import Editor from "../../componentsAdmin/editor";
import { TextField } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
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


import { useSelector } from "react-redux";
import { useHistory } from "react-router";

const AddNews = () => {
  const history = useHistory();

  const user = useSelector((state) => state.auth.user);


  const [error, setError] = useState(false);
  const editorRef = useRef(null);
  const titleRef = useRef(null);
  const locationRef = useRef(null);

  const [categories, setCategories] = useState([]);

  const [category, setCategory] = useState("");
  const [publishedDate, setPublishedDate] = useState(new Date());
  const [preview, setPreview] = useState("");
  const [image, setImage] = useState("");
  const [sending, setSending] = useState(false);

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
    const imageURL = URL.createObjectURL(e.target.files[0]);
    setPreview(imageURL);
  };

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
    newsData.append("title", titleRef.current.value);
    newsData.append("category", category);
    newsData.append("location", locationRef.current.value);
    newsData.append("image", image);
    newsData.append("published_date", publishedDate);
    newsData.append("content", editorRef.current.state.value);
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
        inputRef={titleRef}
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

      <TextField
        id="outlined-basic"
        label="News Location"
        variant="outlined"
        fullWidth
        style={{ marginBottom: "20px" }}
        inputRef={locationRef}
      />

      <h4>News Article</h4>

      <Editor editorRef={editorRef} />
      <div style={{ marginBottom: "30px" }}></div>

      <div>
        <h4>Add Featured Image</h4>
      </div>

      <Upload imageHandler={imageHandler} />
      <div style={{ marginBottom: "30px" }}></div>
      {preview && (
        <div style={{ maxWidth: "400px" }}>
          <img src={preview} alt="" />
        </div>
      )}

      <div style={{ marginBottom: "40px" }}></div>

      {/* <button onClick={printContent}>Print Now</button> */}

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
    </Layout>
  );
};

export default AddNews;
