import React from "react";
import Layout from "../../componentsAdmin/layout";
import { useState, useEffect } from "react";
import { baseAPI } from "../../config";
import Table from "./newsTable";
import { useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";

const MyNews = () => {
  const [news, setNews] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const [published, setPublished] = useState(true);
  const [length, setLength] = useState("");
  const [page, setPage] = useState(1);

  const getNews = async (status = true) => {
    const response = await fetch(
      `${baseAPI}/api/news?author=${user._id}&isPublished=${status}&page=${page}`
    );
    const data = await response.json();
    setNews(data.news);
  };

  useEffect(() => {
    getNews();
  }, [page]);

  return (
    <Layout heading={"My News"}>
      <div style={{ marginBottom: "30px" }}>
        <Button
          variant={published ? "contained" : "outlined"}
          color="secondary"
          onClick={() => {
            setPublished(true);
            getNews(true);
          }}
        >
          Published News
        </Button>
        <span style={{ marginRight: "10px" }}></span>
        <Button
          variant={published ? "outlined" : "contained"}
          color="secondary"
          onClick={() => {
            setPublished(false);
            getNews(false);
          }}
        >
          Draft News
        </Button>
      </div>
      <Table data={news} />

      <div
        style={{
          marginTop: "30px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Pagination
          count={length}
          color="secondary"
          page={page}
          onChange={() => {
            setPage((ppage) => ppage + 1);
          }}
        />
      </div>
    </Layout>
  );
};

export default MyNews;
