/*
-------------------------------------
Parent component to render all the events as dropdowns
Should be in the containers folder?
Pata nahi baad me dekh lenge
-------------------------------------
*/

import React from "react";
import { connect } from "react-redux";
// import * as actions from "../../store/actions/events";
import { makeStyles } from "@material-ui/core/styles";
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography,
  List
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Links from "./Links";
// -----------------------------------

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(20),
    fontWeight: theme.typography.fontWeightRegular
  },
  list: {
    width: "100%"
  },
  listItem: {
    width: "100%"
  },
  link: {
    textDecoration: "none",
    color: theme.palette.common.black
  }
}));

const Events = props => {
  const classes = useStyles();

  // this will eventually be an array of objects
  // each object will contatin number of levels to be displayed
  // each level button will lead to a new route with the grading buttons

  const events = props.events;
  return (
    <div className={classes.root}>
      {events.map((event, index) => {
        const { name, id, levels_info } = event;
        return (
          <ExpansionPanel key={index}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              // dekho mai aria tags use kar rha hu :-)
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>{name}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <List className={classes.list}>
                {levels_info.map((level, levelIndex) => {
                  return (
                    <Links
                      eventName={name}
                      eventId={id}
                      levelName={level.name}
                      levelId={level.id}
                      key={levelIndex}
                    />
                  );
                })}
              </List>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        );
      })}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    events: state.events.eventsList
  };
};

export default connect(mapStateToProps)(Events);
