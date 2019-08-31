import React from 'react'
import {Link} from "react-router-dom"

import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, Divider } from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu"

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 250
  }
}));

const TopBar = () => {
  const classes = useStyles();

  const [state, setState] = React.useState({
    left: false
  });

  const toggleDrawer = (side, open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setState({...state, [side]: open});
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        <ListItem button key="events">
          {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
          <ListItemText primary="Events" />
        </ListItem>
      </List>
      <Divider />
      <List>
        {['Contacts', 'Labels'].map((text, index) => (
          <ListItem button key={text}>
            {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  )

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer('left', true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Event Management System
          </Typography>
          <Button color="inherit" component={Link} to="/">Logout</Button>
        </Toolbar>
      </AppBar>

      <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
        {sideList('left')}
      </Drawer>
    </div>
  )
}

export default TopBar;
