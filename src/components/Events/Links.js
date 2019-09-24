import React from "react";
import { ListItem, ListItemText } from "@material-ui/core";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../store/actions/teams";

const style = {
  listItem: {
    width: "100%"
  },
  link: {
    textDecoration: "none",
    color: "black"
  }
};
class Links extends React.Component {
  render() {
    // console.log(this.props);
    const { eventId, eventName, levelId } = this.props;
    return (
      <Link
        to={`/dashboard/${eventName}/level/${levelId}`}
        style={style.link}
        // add async redux action to fetch team names for this level
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
)(Links);
