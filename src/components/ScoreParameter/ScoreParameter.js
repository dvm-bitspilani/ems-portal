import React, { useState } from "react";
import { Typography, TextField } from "@material-ui/core";

const useStyles = theme => ({
  textField: {
    marginBottom: theme.spacing(1),
    width: "100%"
  }
});

const ScoreParameter = props => {
  const { parameter_id, parameter_name } = props;
  const classes = useStyles();

  // state variables: score, comments, keylog
  const [score, setScore] = useState(0);
  const [comments, setComments] = useState("");
  // const [keylogs, setKeylogs] = useState("")

  return (
    <div>
      <Typography variant="body1">{parameter_name}</Typography>
      <form>
        <TextField
          id={parameter_id + ""}
          label="Score"
          className={classes.textField}
          margin="normal"
          onChange={e => setScore(e.target.value)}
          // onKeyUp={() => keylogger()}
          name="score"
        />
        <TextField
          id={parameter_id + ""}
          label="Comments"
          className={classes.textField}
          margin="normal"
          onChange={e => setComments(e.target.value.toString())}
          // onKeyUp={keylogger}
          name="comments"
        />
      </form>
    </div>
  );
};

export default ScoreParameter;
