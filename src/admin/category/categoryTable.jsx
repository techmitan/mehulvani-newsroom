import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

import { baseAPI } from "../../config";
import Update from "./update";

export default function BasicTable({ data, getCat, setGetCat }) {
  const updateStatusHandler = async (status, catId) => {
    const response = await fetch(`${baseAPI}/api/category/${catId}/status`, {
      method: "PUT",
      body: JSON.stringify({ isPublished: status }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setGetCat(!getCat);
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: "bold" }}>Categories</TableCell>
            <TableCell align="right" style={{ fontWeight: "bold" }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((cat) => (
            <TableRow key={cat._id}>
              <>
                <TableCell component="th" scope="row">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {cat.imageUrl && (
                      <img
                        src={cat.imageUrl}
                        alt="categoryImage"
                        style={{ maxWidth: "40px", marginRight: "20px" }}
                      />
                    )}

                    {cat.title}
                  </div>
                </TableCell>
                <TableCell align="right">
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Update
                      title={cat.title}
                      id={cat._id}
                      imageProp={cat.imageUrl}
                    />
                    {cat.isPublished ? (
                      <IconButton
                        aria-label="delete"
                        color="primary"
                        onClick={() => {
                          updateStatusHandler(false, cat._id);
                        }}
                      >
                        <VisibilityIcon />
                      </IconButton>
                    ) : (
                      <IconButton
                        aria-label="delete"
                        color="secondary"
                        onClick={() => {
                          updateStatusHandler(true, cat._id);
                        }}
                      >
                        <VisibilityOffIcon />
                      </IconButton>
                    )}
                  </div>
                </TableCell>
              </>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
