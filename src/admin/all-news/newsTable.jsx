import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import CallMadeIcon from "@material-ui/icons/CallMade";
import EditIcon from "@material-ui/icons/Edit";

import moment from "moment";
import { useHistory } from "react-router";

export default function BasicTable({ data }) {
  const history = useHistory();

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: "bold" }}>News</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Author</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Date</TableCell>
            <TableCell align="center" style={{ fontWeight: "bold" }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((news) => (
            <TableRow key={news._id}>
              <>
                <TableCell component="th" scope="row">
                  {news.title && news.title.slice(0, 70).concat("...")}
                </TableCell>
                <TableCell component="th" scope="row">
                  {news.author.full_name}
                </TableCell>
                <TableCell component="th" scope="row">
                  {moment(news.published_date).format("lll")}
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    aria-label="delete"
                    color="primary"
                    onClick={() => {
                      history.push(`/dashboard/edit-news/${news._id}`);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    color="secondary"
                    onClick={() => {}}
                  >
                    <DeleteForeverIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    color="primary"
                    onClick={() => {
                      const win = window.open(`/news/${news._id}`, "_blank");
                      win.focus();
                    }}
                  >
                    <CallMadeIcon />
                  </IconButton>
                </TableCell>
              </>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
