import React from "react";
import { ListItem, ListItemText } from "@material-ui/core";
import { Link } from "react-router-dom";

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

// const mapDispatchToProps = dispatch => {
//   return {
//     levelUpdate: (eventName, level) =>
//       dispatch(actions.updateLevel(eventName, level))
//   };
// };

export default Links;
