import React from "react";
import Layout from "../../componentsAdmin/layout";
import { useState, useEffect } from "react";
import { baseAPI } from "../../config";
import { TextField, Button } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import CategoryTable from "./categoryTable";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";

const Category = () => {
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState([]);
  const [creating, setCreating] = useState(false);
  const [success, setSuccess] = useState(false);
  const [getCat, setGetCat] = useState(false);

  if (success) {
    setTimeout(() => {
      setSuccess(false);
    }, 4000);
  }

  useEffect(() => {
    const getCategories = async () => {
      const response = await fetch(`${baseAPI}/api/category`);
      const data = await response.json();
      setCategories(data.categories);
    };
    getCategories();
  }, [getCat]);

  const createCategoryHandler = async () => {
    setCreating(true);
    const response = await fetch(`${baseAPI}/api/category`, {
      method: "POST",
      body: JSON.stringify({ title: title }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setCreating(false);
    setGetCat(!getCat);
    setTitle("");
    setSuccess(true);
  };

  return (
    <Layout heading={"Category"}>
      {success && (
        <Alert severity="success" style={{ marginBottom: "20px" }}>
          Your category is created now!
        </Alert>
      )}

      <TextField
        id="outlined-basic"
        label="Category"
        variant="outlined"
        fullWidth
        style={{ marginBottom: "20px" }}
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />

      {!creating ? (
        <Button
          variant="contained"
          color="primary"
          endIcon={<SendIcon />}
          style={{ marginBottom: "20px" }}
          onClick={createCategoryHandler}
        >
          Create
        </Button>
      ) : (
        <Button
          variant="contained"
          endIcon={<CircularProgress size={20} />}
          style={{ marginBottom: "20px" }}
          disabled
        >
          Creating
        </Button>
      )}

      <hr />

      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
        <h3>All Categories</h3>
      </div>

      <CategoryTable data={categories} getCat={getCat} setGetCat={setGetCat} />
    </Layout>
  );
};

export default Category;
