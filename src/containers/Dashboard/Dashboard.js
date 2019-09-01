import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography, Divider } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";

import Events from "../../components/Events/Events"

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: grey[200],
    height: "calc(100vh - 64px)",
    padding: theme.spacing(0,2)
  },
  root: {
    padding: theme.spacing(3, 2)
  },
  boldText: {
    fontWeight: "bold"
  },
  dashboard: {
    color: grey[600],
    padding: theme.spacing(2,0),
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
    <div className={classes.container}>
      <Typography component="p" className={classes.dashboard}>DASHBOARD</Typography>
      <Paper className={classes.root}>
        <Typography variant="h4">HELLO JUDGES!</Typography>
        <Typography component="p" className={classes.caption}>Please select an event and the corresponding level to be judged:</Typography>
        <Divider style={{margin: "20px 0"}}/>
        <Events />
      </Paper>
    </div>
  );
};

export default Dashboard;
