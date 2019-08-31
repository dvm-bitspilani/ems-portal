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

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  list: {
    width: '100%'
  },
  listItem: {
    width: "100%"
  }
}));

const Events = () => {
  const classes = useStyles();
  const events = ["Rap Wars", "Purple Prose", "Rocktaves"];

  return (
    <div className={classes.root}>
      {events.map((event, index) => {
        return (
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              key={index}
            >
              <Typography className={classes.heading}>{event}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <List className={classes.list}>
                <ListItem button className={classes.listItem}>
                  <ListItemText primary="Level 1" />
                </ListItem>
                <ListItem button className={classes.listItem}>
                  <ListItemText primary="Level 2" />
                </ListItem>
              </List>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        );
      })}
    </div>
  );
};

export default Events;
