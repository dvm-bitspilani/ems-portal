import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography, Divider } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";

import Events from "./Events"

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2)
  },
  boldText: {
    fontWeight: "bold"
  },
  dashboard: {
    color: grey[600],
    margin: theme.spacing(2,0,2,2),
    fontWeight: "bold"
  },
  greet: {
    fontWeight: "bold"
  },
  caption: {
    margin: theme.spacing(1,0)
  }
}));

const Dashboard = () => {
  const classes = useStyles();
  return (
    <div>
      <Typography component="p" className={classes.dashboard}>DASHBOARD</Typography>
      <Paper className={classes.root}>
        <Typography variant="h4">HELLO JUDGES!</Typography>
        <Typography component="p" className={classes.caption}>Please select an event:</Typography>
        <Divider style={{margin: "20px 0"}}/>

        <Events />
      </Paper>
    </div>
  );
};

export default Dashboard;
