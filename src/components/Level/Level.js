import React from "react";
import { connect } from "react-redux";
// import * as actions from "../../store/actions/level";
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
    console.log(this.props)
    return (
      <Container fixed>
        <h1>Teams</h1>
        <div fixed="true" className="container">
          <div className="teamName">
            <ListItemText primary={"Team Name"} className="link" />
            <ListItemText primary={"Total Score: 5"} className="link" />
            <Button variant="contained" color="primary" className="button">
              Update Score
            </Button>
            <Button variant="contained" color="secondary" className="button">
              Freeze
            </Button>
          </div>
          <div className="teamName">
            {/* <ListItem button> */}
            <ListItemText primary={"Team Name"} className="link" />
            <ListItemText primary={"Total Score: 5"} className="link" />
            <Button variant="contained" color="primary" className="button">
              Update Score
            </Button>
            <Button variant="contained" color="secondary" className="button">
              Freeze
            </Button>
            {/* </ListItem> */}
          </div>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    teams: state.teams.teams
  };
};

export default connect(mapStateToProps)(Level);
