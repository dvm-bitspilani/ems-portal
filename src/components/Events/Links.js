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
    return (
      <Link
        to={`/dashboard/${this.props.eventName}/level/${this.props.levelId}`}
        style={style.link}
        // add async redux action to fetch team names for this level
        onClick={() => this.props.fetchTeams(this.props.eventId)}
      >
        <ListItem button style={style.listItem}>
          <ListItemText primary={this.props.levelName} />
        </ListItem>
      </Link>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     eventName: state.level.eventName,
//     level: state.level.level
//   };
// };

const mapDispatchToProps = dispatch => {
  return {
    fetchTeams: eventId => dispatch(actions.fetchTeams(eventId))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Links);
