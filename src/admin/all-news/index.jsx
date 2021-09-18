import React from "react";
import Layout from "../../componentsAdmin/layout";
import { useState, useEffect } from "react";
import { baseAPI } from "../../config";
import Table from "./newsTable";
import { Button } from "@material-ui/core";
import { CircularProgress } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";

const AllNews = () => {
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const [published, setPublished] = useState(true);
  const [length, setLength] = useState("");
  const [loading, setLoading] = useState(true);

  const getNews = async (status = true) => {
    const response = await fetch(
      `${baseAPI}/api/news?isPublished=${status}&page=${page}`
    );
    const data = await response.json();
    setNews(data.news);
    setLength(Math.ceil(data.totalNews / 10));
    setLoading(false);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    getNews();
  }, [page]);

  if (loading) {
    return (
      <Layout heading={"All News"}>
        <CircularProgress />
      </Layout>
    );
  } else {
    return (
      <Layout heading={"All News"}>
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

        {length > 10 && (
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
        )}
      </Layout>
    );
  }
};

export default AllNews;
