import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import moment from "moment";



export default function BasicTable({ data }) {

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: "bold" }}>Poll</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Yes</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>No</TableCell>
            <TableCell align="center" style={{ fontWeight: "bold" }}>
              Date
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((poll) => (
            <TableRow key={poll._id}>
              <>
                <TableCell component="th" scope="row">
                  {poll.question}
                </TableCell>
                <TableCell component="th" scope="row">
                  {poll.yes}
                </TableCell>
                <TableCell component="th" scope="row">
                  {poll.no}
                </TableCell>
                <TableCell component="th" scope="row">
                  {moment(poll.createdAt).format("lll")}
                </TableCell>
              </>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
