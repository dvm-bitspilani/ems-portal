// BREADCRUMB CODE
import React from 'react';
// import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
// import List from '@material-ui/core/List';
// import Link from '@material-ui/core/Link';
// import ListItem from '@material-ui/core/ListItem';
// import Collapse from '@material-ui/core/Collapse';
// import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
// import ExpandLess from '@material-ui/icons/ExpandLess';
// import ExpandMore from '@material-ui/icons/ExpandMore';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { BrowserRouter as Router, Route,Redirect, MemoryRouter,Switch } from 'react-router-dom';
import Link from 'react-router-dom/Link';
import {withRouter} from 'react-router-dom';
// import Container from "@material-ui/core/Container";

const useStyles = makeStyles(theme => ({
  container:{
  display: 'flex',
  width: "100vw",
  margin: 'auto',
  background: '#eeeeee',
  paddingLeft: '20px',
  alignItems: 'center',
  height: '40px',
  fontSize: theme.typography.fontSize.larger,
  borderBottom: "1px solid #b5b5b5",
  boxSizing: "border-box"
  },    
  nested: {
    paddingLeft: theme.spacing(4),
  },
  links:{
    textDecoration: "none",
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    color: "rgba(0,0,0,.54)",
  },
  lastLink:{
    textDecoration: "none",
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    color: "black"
  }
}));

// const LinkRouter = props => <Links {...props} />;

function RouterBreadcrumbs() {
  const classes = useStyles();
  // const [open, setOpen] = React.useState(true);

  // const handleClick = () => {
  //   setOpen(prevOpen => !prevOpen);
  // };

  return (
    <div className={classes.container}>
      {/* <div className={classes.root}> */}
      <Route>
          {() => {
            let pathnames = window.location.pathname.split('/').filter(x => x);
            console.log(pathnames);
            return (
              <Breadcrumbs aria-label="breadcrumb">
                <Link to="/dashboard" className={classes.links}>
                  Dashboard
                </Link>
                {pathnames.map((value, index) => {
                  const last = index === pathnames.length - 1;
                  pathnames = pathnames.filter((value) => {
                    return value !== "dashboard"
                  });
                  const to = `/dashboard/${pathnames.slice(0, index + 1).join('/')}`;
                  console.log(to);
                  return last ? (
                    <Typography color="textPrimary" key={to} className={classes.lastLink}>
                      {
                        pathnames[index]
                      }
                    </Typography>
                  ) : (
                    <Link color="inherit" to={to} key={to} className={classes.links}>
                      {pathnames[index]}
                    </Link>
                  );
                })}
              </Breadcrumbs>
            );
          }}
        </Route>
      {/* </div> */}
    </div>
  );
}
export default withRouter(RouterBreadcrumbs);
//******ENDS HERE******** */
