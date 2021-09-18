import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import DoneIcon from "@material-ui/icons/Done";
import BlockIcon from "@material-ui/icons/Block";
import { baseAPI } from "../../config";
import moment from "moment";



export default function BasicTable({ data, getUsers, setGetUsers }) {

  const updateStatusHandler = async (status, userId) => {
    let approveBody = {};
    if (status) {
      approveBody = { isApproved: true, role: "reporter" };
    } else {
      approveBody = { isApproved: false, role: "user" };
    }

    const response = await fetch(`${baseAPI}/api/user/${userId}/approve`, {
      method: "PUT",
      body: JSON.stringify(approveBody),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setGetUsers(!getUsers);
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: "bold" }}>Full Name</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Email</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Date</TableCell>
            <TableCell align="right" style={{ fontWeight: "bold" }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((user) => (
            <TableRow key={user._id}>
              <>
                <TableCell component="th" scope="row">
                  {user.full_name}
                </TableCell>

                <TableCell component="th" scope="row">
                  {user.email}
                </TableCell>

                <TableCell component="th" scope="row">
                  {moment(user.createdAt).format("lll")}
                </TableCell>
                <TableCell align="right">
                  {user.role !== "admin" && user.isApproved && (
                    <Button
                      variant="outlined"
                      color="secondary"
                      startIcon={<BlockIcon />}
                      onClick={() => {
                        updateStatusHandler(false, user._id);
                      }}
                    >
                      Block
                    </Button>
                  )}
                  {user.role !== "admin" && !user.isApproved && (
                    <Button
                      variant="outlined"
                      color="primary"
                      startIcon={<DoneIcon />}
                      onClick={() => {
                        updateStatusHandler(true, user._id);
                      }}
                    >
                      Approve
                    </Button>
                  )}
                </TableCell>
              </>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
