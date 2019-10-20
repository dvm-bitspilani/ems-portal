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
  makeStyles
} from "@material-ui/core";
import "./level.scss";
import { grey } from "@material-ui/core/colors";
import Spinner from "../Spinner/Spinner";

/* structure of teams array from request
    teams: [
      {
        teamName,
        teamId,
        score
      }
    ]
*/

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: grey[200],
    minHeight: "calc(100vh - 90px)",
    padding: theme.spacing(2)
  },
  paper: {
    padding: theme.spacing(3, 2)
  }
}));

const Level = props => {
  const classes = useStyles();
  const teams = [...props.teams];

  // state variables to disable Update Score button
  const [shouldDisable, setShouldDisable] = useState({});

  const handleClickOpen = e => {
    e.persist();
    const teamId = e.target.id;
    // console.log("TeamId", e.target.id);
    if (window.confirm("Do you really want to freeze this score?")) {
      const IDs = {
        eventId: localStorage.getItem("eventId"),
        levelId: localStorage.getItem("levelId"),
        teamId: teamId
      };
      props.freezeScore(IDs);
      shouldDisable[teamId] = true;
      setShouldDisable({ ...shouldDisable });
    }
  };

  useEffect(() => {
    console.log("Using effect");
    props.fetchTeams(
      localStorage.getItem("eventId"),
      localStorage.getItem("levelId")
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                  // console.log("TeamID",team.id);

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
                        >
                          <div id={team.id}>Frozen</div>
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          color="secondary"
                          className="button"
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
