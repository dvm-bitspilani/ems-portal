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
  createData("Shivanshu Ayachi", "+91-7389216920", "mail@mail.com"),
  createData("Divyansh Aggarwal", "+91-8800992911", "mail@mail.com"),
  createData("Shreyans Jain", "+91-9582945729", "mail@mail.com"),
  createData("Akshit Patel", "+91-7000392197", "mail@mail.com")
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
