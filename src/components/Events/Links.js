import React from "react";
import { ListItem, ListItemText } from "@material-ui/core";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../store/actions/level";

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
  state = {
    eventName: this.props.eventName,
    level: this.props.level
  };

  updateLevel = () => {
    this.props.levelUpdate(this.state.eventName, this.state.levelName);
  };

  render() {
    // console.log(this.props.level)
    // const { name, id } = this.props.level;
    // console.log(name);
    return (
      <Link
        to={`/dashboard/${this.state.eventName}/level/${this.props.id}`}
        style={style.link}
        onClick={this.updateLevel}
      >
        <ListItem button style={style.listItem}>
          <ListItemText primary={this.props.levelName} />
        </ListItem>
      </Link>
    );
  }
}

const mapStateToProps = state => {
  return {
    eventName: state.level.eventName,
    level: state.level.level
  };
};

const mapDispatchToProps = dispatch => {
  return {
    levelUpdate: (eventName, level) =>
      dispatch(actions.updateLevel(eventName, level))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Links);
