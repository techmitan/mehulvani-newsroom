import React from "react";
import { baseAPI } from "../../config";
import Layout from "../../componentsAdmin/layout";
import RestorePageIcon from "@material-ui/icons/RestorePage";
// import Editor from "../../componentsAdmin/editor";
import TinyEditor from "../../componentsAdmin/tinyEditor";
import { TextField } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";
import SaveIcon from "@material-ui/icons/Save";
import AddBoxIcon from "@material-ui/icons/AddBox";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Upload from "./upload";

import { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router";

const EditNews = () => {
  const history = useHistory();
  const { id } = useParams();

  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [categories, setCategories] = useState([]);
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(false);
  const [publishedDate, setPublishedDate] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [preview, setPreview] = useState("");
  const [imageChanged, setImageChanged] = useState(false);

  const editorRef = useRef(content);
  const titleRef = useRef(title);
  const locationRef = useRef(location);

  const getCategories = async () => {
    const response = await fetch(`${baseAPI}/api/category`);
    const data = await response.json();
    setCategories(data.categories);
  };

  const getNews = async () => {
    const response = await fetch(`${baseAPI}/api/news/${id}`);
    const data = await response.json();

    setTitle(data.news.title);
    setLocation(data.news.location);
    setContent(data.news.content);

    setPublishedDate(data.news.published_date);
    setCategory(data.news.category._id);
    setContent(data.news.content);
    setIsPublished(data.news.isPublished);
    setPreview(data.news.imageUrl);
    setLoading(false);
  };

  useEffect(() => {
    getNews();
    getCategories();
  }, []);

  const sendNewsHandler = (status) => {
    setSending(true);
    const newsData = new FormData();
    newsData.append("title", titleRef.current.value);
    newsData.append("category", category);
    newsData.append("location", locationRef.current.value);
    newsData.append("published_date", publishedDate);
    newsData.append("content", editorRef.current.getContent());
    newsData.append("isPublished", status);

    if (imageChanged) {
      newsData.append("image", image);
    }

    const sendNewsAPI = async () => {
      const response = await fetch(`${baseAPI}/api/news/${id}`, {
        method: "PUT",
        body: newsData,
      });
      const data = await response.json();
      setSending(false);
      if (data.success) {
        // setSuccess(true);
        titleRef.current.value = data.news.title;
        locationRef.current.value = data.news.location;
        setContent(data.news.content);
        setPublishedDate(data.news.published_date);
        setCategory(data.news.category);
        setIsPublished(data.news.isPublished);
        setPreview(data.news.imageUrl);
        window.scrollTo(0, 0);
      } else {
        setError(true);
        window.scrollTo(0, 0);
      }
    };
    sendNewsAPI();
  };


  const imageHandler = (e) => {
    setImage(e.target.files[0]);
    const imageURL = URL.createObjectURL(e.target.files[0]);
    setPreview(imageURL);
    setImageChanged(true);
  };

  if (loading) {
    return (
      <>
        <h1>Loading...</h1>
      </>
    );
  } else {
    return (
      <Layout heading={"Edit News"}>
        <Button
          variant="outlined"
          color="secondary"
          endIcon={<AddBoxIcon />}
          onClick={() => {
            history.push("/dashboard/create-news");
          }}
        >
          Add New
        </Button>
        <div style={{ marginBottom: "20px" }}></div>
        <div>
          {/* {success && (
          <Alert severity="success" style={{ marginBottom: "20px" }}>
            Your news is published now!
          </Alert>
        )} */}
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

          <div style={{ marginBottom: "20px" }}></div>

          <InputLabel id="news-category">Select News Category</InputLabel>
          <Select
            labelId="news-category"
            id="news-category"
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
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
            }}
          />

          <h4>News Article</h4>

          <TinyEditor editorRef={editorRef} value={content} />

          <div style={{ marginBottom: "30px" }}></div>

          <div>
            <h4>News Image</h4>
            <Upload imageHandler={imageHandler} />
            <div style={{ marginBottom: "30px" }}></div>
            {preview && (
              <div style={{ maxWidth: "400px" }}>
                <img src={preview} alt="" />
              </div>
            )}

            <div style={{ marginBottom: "40px" }}></div>
          </div>
          {/* buttons */}
          {sending && <CircularProgress />}

          <div></div>

          {isPublished && (
            <>
              <Button
                variant="outlined"
                color="primary"
                endIcon={<SendIcon />}
                style={{ marginRight: "15px" }}
                onClick={() => {
                  sendNewsHandler(true);
                }}
              >
                Update
              </Button>
              <span style={{ marginRight: "20px" }}></span>
              <Button
                variant="contained"
                color="primary"
                endIcon={<RestorePageIcon />}
                style={{ marginRight: "15px" }}
                onClick={() => {
                  sendNewsHandler(false);
                }}
              >
                UnPublish
              </Button>
            </>
          )}

          {!isPublished && (
            <>
              <Button
                variant="contained"
                color="secondary"
                endIcon={<SendIcon />}
                onClick={() => {
                  sendNewsHandler(true);
                }}
              >
                Publish Now
              </Button>
              <span style={{ marginRight: "20px" }}></span>
              <Button
                variant="outlined"
                color="primary"
                endIcon={<SaveIcon />}
                onClick={() => {
                  sendNewsHandler(false);
                }}
              >
                Save Draft
              </Button>
            </>
          )}
        </div>
      </Layout>
    );
  }
};

export default EditNews;
