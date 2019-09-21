import React from "react";
import { connect } from "react-redux";
// import * as actions from "../../store/actions/level";
import {
  List,
  ListItem,
  ListItemText,
  Container,
  Button
} from "@material-ui/core";

const styles = {
  h1: {
    fontFamily: "Roboto, Helvetica, Arial, sans-serif"
  },
  button: {
    margin: "10px"
  },
  container: {
    overflow: "scroll",
    width: "100%",
    margin: "1vw auto",
    display: "flex"
  },
  link: {
    width: "140px"
  }
};
class Level extends React.Component {
  render() {
    // const teams = [...this.props.teams]
    return (
      <Container fixed>
        <h1 style={styles.h1}>Teams</h1>
        <div fixed style={styles.container}>
          <List component="nav" aria-label="secondary mailbox folders">
            <ListItem button>
              <ListItemText primary={"Team Name"} style={styles.link} />
              <ListItemText primary={"Total Score: 5"} style={styles.link} />
              <Button variant="contained" color="primary" style={styles.button}>
                Update Score
              </Button>
              <Button
                variant="contained"
                color="secondary"
                style={styles.button}
              >
                Freeze
              </Button>
            </ListItem>
          </List>
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
