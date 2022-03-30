import React from "react";
import {
  Typography,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  makeStyles,
  Paper
} from "@material-ui/core";
import { grey } from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  container: {
    backgroundColor: grey[200],
    height: "calc(100vh - 90px)",
    padding: theme.spacing(2)
  },
  tabelContainer: {
    width: "100%",
    overflowX: "scroll"
  },
  table: {
    minWidth: 500,
  },
  caption: {
    margin: theme.spacing(1, 0)
  },
  paper: {
    padding: theme.spacing(3, 2)
  },
  dashboard: {
    fontWeight: "bold",
    color: grey[600],
    padding: theme.spacing(2, 0)
  }
}));

const createData = (name, phone, email) => {
  return { name, phone, email };
};

const rows = [
  createData("Sarthak Arora", "+91-7087797760", "f20200060@pilani.bits-pilani.ac.in"),
  createData("Alvin Adarsh Kumar", "+91-9135945158", "f20200931@pilani.bits-pilani.ac.in"),
  createData("Dhruv Popuri", "+91-9553714240", "f20200930@pilani.bits-pilani.ac.in"),
  createData("Aditya Thakur", "+91-9228632935", "f20200630@pilani.bits-pilani.ac.in")
];

const Contacts = props => {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.container}>
        <Typography component="p" className={classes.dashboard}>
          DASHBOARD
        </Typography>
        <Paper className={classes.paper}>
          <Typography variant="h4">Having Issues?</Typography>
          <Typography component="p" className={classes.caption}>
            Contact any of the developers for support:
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <div className={classes.tabelContainer}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">Phone</TableCell>
                  <TableCell align="left">Email</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(row => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="left">{row.phone}</TableCell>
                    <TableCell align="left">{row.email}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Paper>
      </div>
    </div>
  );
};

export default Contacts;
