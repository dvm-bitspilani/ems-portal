import React, { useState, useEffect } from "react";
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
    minHeight: "calc(100vh - 90px)",
    padding: theme.spacing(2)
    // paddingTop: theme.spacing(2)
  },
  paper: {
    padding: theme.spacing(3, 2)
  },
  textField: {
    marginBottom: theme.spacing(4),
    width: "100%"
  },
  parameterName: {
    marginTop: theme.spacing(2)
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
  const [keylogs, updateKeyLogs] = useState({});
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

    setInputs({ ...inputs });
  };

  const handleKeyLogs = e => {
    let a = [];
    if (keylogs[e.target.id] == null) {
      a = [e.target.value];
    } else {
      a = keylogger(e, keylogs[e.target.id].keylogs);
    }

    keylogs[e.target.id] = {
      ...keylogs[e.target.id],
      keylogs: a
    };
    updateKeyLogs({ ...keylogs });
  };

  const keylogger = (event, oldLogs) => {
    // return function(event){
    // let value = event.target.value;
    // if(oldLogs.length == 0 ){ oldLogs =[]}
    // console.log(oldLogs);
    let keyLogs1 = oldLogs;
    let keyCode = event.keyCode;
    if (keyCode === 8 || keyCode === 46) {
      keyLogs1.push("*");
      // console.log("keylogs" + keyLogs1);
    } else {
      // console.log(keyCode);
      if (event.keyCode >= 96 && event.keyCode <= 105) {
        keyCode = keyCode - 48;
      }
      keyLogs1.push(String.fromCharCode(keyCode));
      console.log(keyLogs1);
    }
    oldLogs = keyLogs1;
    return oldLogs;
    // }
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
    teamId: localStorage.getItem("teamId")
  };

  useEffect(() => {
    props.fetchParams(ids);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              const {
                parameter_name,
                parameter_id,
                parameter_max_value,
                parameter_min_value,
                parameter_instance_value
              } = parameter;
              // params_info.push({ parameter_id: { score: "", comments: "" } });

              return (
                <div id={parameter_id} key={index}>
                  <Typography variant="h6" className={classes.parameterName}>
                    {parameter_name}
                  </Typography>
                  <Typography variant="body1">{`Min-score:${parameter_min_value} | Max-score:${parameter_max_value}`}</Typography>
                  <form>
                    <TextField
                      id={parameter_id + ""}
                      label={`${parameter_instance_value}`}
                      className={classes.textField}
                      margin="none"
                      onChange={handleInput}
                      name="score"
                      // value={`${parameter_instance_value}`}
                      onKeyUp={handleKeyLogs}
                    />
                  </form>
                </div>
              );
            })}

            <Button
              variant="contained"
              color="primary"
              className="button"
              onClick={() => {
                const params_info = [...props.params_info];
                props.updateScore(params_info, ids, inputs, keylogs);
              }}
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
    updateScore: (parameters, ids, inputs, keylogs) =>
      dispatch(actions.post_score_update(parameters, ids, inputs, keylogs)),
    fetchParams: ids => dispatch(actions.fetch_params(ids))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateScore);
