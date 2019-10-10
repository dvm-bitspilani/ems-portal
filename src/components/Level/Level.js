// renders list of teams for a particular level

import React from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

import { Link } from "react-router-dom";
import ListItemText from "@material-ui/core/ListItemText";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import "./level.scss";

// const styles = {
//   h1: {
//     "font-family": "Roboto, Helvetica, Arial, sans-serif"
//   },
//   button: {
//     margin: "10px"
//   },
//   container: {
//     overflow: "scroll",
//     width: "100%",
//     margin: "1vw auto",
//     display: "flex",
//     gridTemplateColumns:
//       "[first] 40px [line2] 50px [line3] auto [col4-start] 50px [five] 40px [end]"
//   },
//   link: {
//     width: "140px"
//   }
// };

class Level extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventName: "Rap Wars 2",
      level: 2
    };
  }
  UNSAFE_componentWillMount() {
    this.setState({
      eventName: this.props.eventName,
      level: this.props.level
    });
  }

  render() {
    // console.log("Props for this level", this.props);
    const teams = [...this.props.teams];
    console.log("teamId from Level.js props", this.props.teamId)
    // const ids = {
    //   eventId: this.props.eventId,
    //   levelId: this.props.levelId,
    //   teamId: this.props.teamId
    // };

    // structure of teams array from request
    // teams: [
    //   {
    //     teamName,
    //     teamId,
    //     score
    //   }
    // ]
    return (
      <Container fixed>
        <h1>Teams</h1>
        <div fixed="true" className="container">
          {teams.map((team, index) => {
            const { name, score, is_frozen } = team;
            const ids = {
              eventId: this.props.eventId,
              levelId: this.props.levelId,
              teamId: team.id
            };
            console.log("[IDs from Level.js]",ids);

            return (
              <div className="teamName" key={index}>
                <Link
                  to={`/team/${team.id}`}
                  onClick={() => {
                    this.props.fetchTeamInfo(
                      this.props.eventId,
                      this.props.levelId,
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
                    onClick={() => this.props.fetchParams(ids)}
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
                  onClick={() => this.props.freezeScore(ids)}
                >
                  Freeze
                </Button>
              </div>
            );
          })}
        </div>
      </Container>
    );
  }
}

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
