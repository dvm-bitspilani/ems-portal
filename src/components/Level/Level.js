// renders list of teams for a particular level
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import { Link } from "react-router-dom";
import {
  Typography,
  Container,
  Button,
  ListItemText,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  makeStyles
} from "@material-ui/core";
import "./level.scss";
import { grey } from "@material-ui/core/colors";
import Spinner from "../Spinner/Spinner";

// structure of teams array from request
// teams: [
//   {
//     teamName,
//     teamId,
//     score
//   }
// ]

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: grey[200],
    minHeight: "calc(100vh - 130px)",
    padding: theme.spacing(2)
    // paddingTop: theme.spacing(2)
  },
  paper: {
    padding: theme.spacing(3, 2)
  }
}));

// function useForceUpdate(){
//   const [value, set] = useState(true); //boolean state
//   return () => set(!value); // toggle the state to force render
// }

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Level = props => {
  const classes = useStyles();
  const teams = [...props.teams];
  const [open, setOpen] = useState(false);

  // state variables to disable Update Score button
  const [shouldDisable, setShouldDisable] = useState({});
  const [id, setId] = useState(-1);

  // const forceUpdate = useForceUpdate();
  const handleClickOpen = e => {
    setOpen(true);
    setId(e.target.id);
  };

  const handleClose = () => {
    setOpen(false);
    // props.history.goBack();
    shouldDisable[id] = true;
    setShouldDisable({ ...shouldDisable });
  };

  // console.log("Event Id", props.eventId);
  useEffect(() => {
    // console.log("Using effect");
    // console.log(props.eventId);
    // console.log(props.levelId);
    props.fetchTeams(
      localStorage.getItem("eventId"),
      localStorage.getItem("levelId")
    );
  }, []);

  return (
    <div className={classes.container}>
      <Container fixed>
        {teams === undefined ? (
          <Spinner />
        ) : (
          <Paper className={classes.paper}>
            <Typography variant="h2">Teams</Typography>
            <div fixed="true" className="container">
              {teams.length === 0 ? (
                <Typography variant="h6">
                  There are no teams for this level
                </Typography>
              ) : (
                teams.map((team, index) => {
                  const { name, score, is_frozen } = team;
                  const ids = {
                    eventId: localStorage.getItem("eventId"),
                    levelId: localStorage.getItem("levelId"),
                    teamId: team.id
                  };

                  return (
                    <div className="teamName" key={index}>
                      <Link
                        to={`/team/${team.id}`}
                        onClick={() => {
                          props.fetchTeamInfo(
                            props.eventId,
                            props.levelId,
                            team.id
                          );
                        }}
                        className="linkTeamName"
                      >
                        <ListItemText primary={`${name}`} className="link" />
                      </Link>
                      <ListItemText
                        primary={`Total Score: ${score}`}
                        className="link"
                      />
                      {shouldDisable[team.id] || is_frozen ? (
                        <Button
                          variant="contained"
                          color="primary"
                          disabled
                          className="button"
                          onClick={() => {
                            window.alert(
                              "Score for this level has been locked by the judge"
                            );
                          }}
                        >
                          Update Score
                        </Button>
                      ) : (
                        <Link
                          to={`/update-score/${team.id}`}
                          // onClick={() => props.fetchParams(ids)}
                          onClick={() =>
                            localStorage.setItem("teamId", team.id)
                          }
                        >
                          <Button
                            variant="contained"
                            color="primary"
                            className="button"
                          >
                            Update Score
                          </Button>
                        </Link>
                      )}
                      {shouldDisable[team.id] || is_frozen ? (
                        <Button
                          variant="contained"
                          disabled
                          color="secondary"
                          className="button"
                          onClick={() => props.freezeScore(ids)}
                        >
                          <div onClick={handleClickOpen} id={team.id}>
                            Frozen
                          </div>
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          color="secondary"
                          className="button"
                          onClick={() => props.freezeScore(ids)}
                        >
                          <div onClick={handleClickOpen} id={team.id}>
                            Freeze
                          </div>
                        </Button>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </Paper>
        )}
      </Container>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Score frozen!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            The total score for this team has been frozen. You will not be able
            to alter the score.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Okay
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    teams: state.teams.teams,
    eventId: state.teams.eventId,
    levelId: state.teams.levelId,
    events: state.events.eventsList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTeamInfo: (eventId, levelId, teamId) =>
      dispatch(actions.fetchTeamInfo(eventId, levelId, teamId)),
    freezeScore: ids => dispatch(actions.post_score_freeze(ids)),
    fetchParams: ids => dispatch(actions.fetch_params(ids)),
    fetchTeams: (eventId, levelId) =>
      dispatch(actions.fetchTeams(eventId, levelId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Level);
