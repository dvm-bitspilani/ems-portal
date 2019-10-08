import React from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  }
}));

const UpdateScore = () => {
  const classes = useStyles();

  return (
    <div>
      <Typography variant="h5">Update Score</Typography>
      <form>
        <TextField
          id="standard-name"
          label="Name"
          className={classes.textField}
          margin="normal"
        />
      </form>
      <Button variant="contained" color="primary" className="button">
        Update
      </Button>
    </div>
  );
};

export default UpdateScore;
