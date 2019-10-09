// Button component for one team
// displayed on events route
// each Button leads to a new page conataining that team's info

import React from "react";
import { ListItem, ListItemText } from "@material-ui/core";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

const style = {
  listItem: {
    width: "100%"
  },
  link: {
    textDecoration: "none",
    color: "black"
  }
};
class LevelButton extends React.Component {
  render() {
    const { eventId, eventName, levelId } = this.props;
    return (
      <Link
        to={`/dashboard/${eventName}/level/${levelId}`}
        style={style.link}
        onClick={() => this.props.fetchTeams(eventId, levelId)}
      >
        <ListItem button style={style.listItem}>
          <ListItemText primary={this.props.levelName} />
        </ListItem>
      </Link>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchTeams: (eventId, levelId) =>
      dispatch(actions.fetchTeams(eventId, levelId))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(LevelButton);
