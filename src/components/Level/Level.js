// renders list of teams for a particular level
import React from "react";
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
    height: "calc(100vh - 130px)",
    padding: theme.spacing(2)
    // paddingTop: theme.spacing(2)
  },
  paper: {
    padding: theme.spacing(3, 2)
  },
}));

const Level = props => {
  const classes = useStyles();
  const teams = [...props.teams]

  return (
    <div className={classes.container}>
      <Container fixed>
        <Paper className={classes.paper}>
          <Typography variant="h2">Teams</Typography>
          <div fixed="true" className="container">
            {teams.map((team, index) => {
              const { name, score, is_frozen } = team;
              const ids = {
                eventId: props.eventId,
                levelId: props.levelId,
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
                  >
                    <ListItemText primary={`${name}`} className="link" />
                  </Link>
                  <ListItemText
                    primary={`Total Score: ${score}`}
                    className="link"
                  />
                  {is_frozen ? (
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
                      onClick={() => props.fetchParams(ids)}
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

                  <Button
                    variant="contained"
                    color="secondary"
                    className="button"
                    onClick={() => props.freezeScore(ids)}
                  >
                    Freeze
                  </Button>
                </div>
              );
            })}
          </div>
        </Paper>
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
    fetchParams: ids => dispatch(actions.fetch_params(ids))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Level);
