import React, { useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import {
  Typography,
  TextField,
  Button,
  makeStyles,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide
} from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import Spinner from "../Spinner/Spinner";
// import keyLogger from "../../utils/keyLogger";
// import useScores from "./InputHook";
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// ------------------ Update Score component -------------------

const UpdateScore = props => {
  // renders inut fields and uses the keylogger to
  // record scores entered by judge
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [inputs, setInputs] = useState({});

  const handleInput = e => {
    // for (let input of inputs) {
    //   if (e.target.id === input) {
    //     if (e.target.name === "score") {
    //       console.log("changing score")
    //       input.score = e.target.value
    //     } else {
    //       console.log("changing comments")
    //       input.comments = e.target.value
    //     }
    //     setInputs([...inputs]);
    //   }
    // }

    let field = e.target.name;
    let value = e.target.value;
    inputs[e.target.id] = {
      ...inputs[e.target.id],
      [field]: value
    };

    setInputs({...inputs});
  };

  // eslint-disable-next-line no-unused-vars
  const keylogger = oldLogs => {
    return event => {
      let value = event.target.value;
      let keylogs = oldLogs;
      let lastStar;
      for (let i = 0; i < keylogs.length; i++) {
        if (keylogs[i] === "*") {
          lastStar = i;
        }
      }

      if (event.keyCode === 8 || event.keyCode === 46) {
        if (lastStar === keylogs.length - 1) {
          console.log("doNothing");
        } else {
          keylogs[lastStar + 2] = "*";
          // document.getElementById("demo").innerHTML += "\n" + event.keyCode;
          console.log(keylogs);
        }
      } else {
        keylogs[lastStar + 1] = value;
        // document.getElementById("demo").innerHTML += "\n" + event.keyCode;
        console.log("step-2 " + keylogs);
      }

      // oldLogs = keylogs;
      // console.log(oldLogs);

      inputs[event.target.id] = {
        ...inputs[event.target.id],
        keylog: keylogs
      };
    };
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    props.history.goBack();
  };

  const ids = {
    eventId: props.eventId,
    levelId: props.levelId,
    teamId: props.teamId
  };
  // const paramIds = [];
  // if (props.params_info !== undefined) {
  //   for (let parameter of props.params_info) {
  //     paramIds.push(parameter.parameter_id);
  //   }
  // }

  // const { handleSubmit, handleInputChange, inputs } = useScores();
  // const params_info = [];
  return (
    <div>
      {props.params_info === undefined ? (
        <Spinner />
      ) : (
        <div className={classes.container}>
          <Paper className={classes.paper}>
            <Typography variant="h4">Update Score</Typography>
            <Typography>
              Please type in the updated scores and comments:
            </Typography>

            {props.params_info.map((parameter, index) => {
              const { parameter_name, parameter_id } = parameter;
              // params_info.push({ parameter_id: { score: "", comments: "" } });

              return (
                <div id={parameter_id} key={index}>
                  <Typography variant="body1">{parameter_name}</Typography>
                  <form>
                    <TextField
                      id={parameter_id + ""}
                      label="Score"
                      className={classes.textField}
                      margin="normal"
                      onChange={handleInput}
                      // onKeyUp={() => keylogger(inputs[parameter_id].keylog || ['*'])}
                      name="score"
                    />
                    <TextField
                      id={parameter_id + ""}
                      label="Comments"
                      className={classes.textField}
                      margin="normal"
                      onChange={handleInput}
                      // onKeyUp={keylogger}
                      name="comments"
                    />
                  </form>
                </div>
              );
            })}
            
            <Button
              variant="contained"
              color="primary"
              className="button"
              onClick={() => props.updateScore(ids, inputs)}
            >
              <div
                // onClick={() => {
                //   if (!props.updateScoreError) return handleClickOpen;
                //   else return null;
                // }}
                onClick={handleClickOpen}
              >
                Update
              </div>
            </Button>
          </Paper>
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle id="alert-dialog-slide-title">
              {"Score updated successfully!"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                The score for this team has been updated. Please note that any
                changes made while entering the score have also been recorded.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Return to Teams
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    eventId: state.teams.eventId,
    levelId: state.teams.levelId,
    teamId: state.score.teamId,
    params_info: state.score.params_info,
    updateScoreError: state.score.updateScoreError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateScore: (ids, inputs) =>
      dispatch(actions.post_score_update(ids, inputs))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateScore);
