import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3,2)
  }
}));

const Dashboard = () => {
  const classes = useStyles();
  return (
    <div>
      <Paper className={classes.root}>
        <Typography variant="h5">Dashboard</Typography>
        <Typography componentf="p">
          Hello raans what are you doing. Chalo saath me dota khelte hain. Oh sorry dota to outdated hai
        </Typography>
      </Paper>
    </div>
  );
};

export default Dashboard;
