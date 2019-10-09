import React from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/score";
import {
  Typography,
  TextField,
  Button,
  makeStyles,
  Paper
} from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
// import makeStyles from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: grey[200],
    height: "calc(100vh - 90px)",
    padding: theme.spacing(2)
    // paddingTop: theme.spacing(2)
  },
  paper: {
    padding: theme.spacing(3, 2)
  },
  textField: {
    marginBottom: theme.spacing(4),
    width: "100%"
  }
}));

const UpdateScore = props => {
  const classes = useStyles();
  const ids = {
    eventId: props.eventId,
    levelId: props.levelId,
    teamId: props.teamId
  };
  console.log(props);

  return (
    <div className={classes.container}>
      <Paper className={classes.paper}>
        <Typography variant="h4">Update Score</Typography>
        <Typography>Please type in the updated score:</Typography>
        <form>
          <TextField
            id="standard-name"
            label="Score"
            className={classes.textField}
            margin="normal"
          />
        </form>
        <Button
          variant="contained"
          color="primary"
          className="button"
          onClick={() => props.updateScore(ids)}
        >
          Update
        </Button>
      </Paper>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    eventId: state.teams.eventId,
    levelId: state.teams.levelId,
    teamId: state.teams.teamId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateScore: ids => dispatch(actions.post_freeze_update(ids))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateScore);
