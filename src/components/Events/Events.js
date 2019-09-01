/*
-------------------------------------
Parent component to render all the events as dropdowns
Should be in the containers folder?
Pata nahi baad me dekh lenge
-------------------------------------
*/

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography,
  List,
  ListItem,
  ListItemText
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { BrowserRouter as Router, Link } from "react-router-dom";

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
    width: '100%'
  },
  listItem: {
    width: "100%",
  },
  link: {
   textDecoration: "none",
   color: theme.palette.common.black
  }
}));

const Events = () => {
  const classes = useStyles();

  // this will eventually have to be an array of objects
  // each object will contatin number of levels to be displayed
  // each level button will lead to a new route with the grading buttons
  // const events = ["Rap Wars", "Purple Prose", "Rocktaves"];
  const events = [{eventName:"Rap Wars",
                   noOfLevels: "3",
                   levels:["level 1","level 2", "level 3"]
                  },
                  {eventName:"Purple Prose",
                   noOfLevels: "3",
                   levels:["level 1","level 2"]
                  },
                  {eventName:"Rocktaves",
                  noOfLevels : "3",
                  levels:["level 1","level 2"]
                  }];
  return (
    <div className={classes.root}>
      {events.map((event, index) => {
        return (
          <ExpansionPanel key={index}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              // dekho mai aria tags use kar rha hu :-)
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
            <Typography className={classes.heading}>{event.eventName}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
            <List className={classes.list}>
              {event.levels.map((levelName,index)=>{
                return(
                   <Link to="/dashboard/level" className={classes.link}>
                      <ListItem button className={classes.listItem}>
                        <ListItemText primary= {levelName}/>
                      </ListItem>   
                   </Link>
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

export default Events;
