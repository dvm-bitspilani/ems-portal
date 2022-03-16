// BREADCRUMB CODE
import React from "react";
import { Typography, makeStyles } from "@material-ui/core";

import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import {
  // BrowserRouter as Router,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";
import { withRouter } from "react-router";
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    width: "99vw",
    margin: "auto",
    background: "#eeeeee",
    paddingLeft: "20px",
    alignItems: "center",
    height: "40px",
    fontSize: theme.typography.fontSize.larger,
    borderBottom: "1px solid #b5b5b5",
    boxSizing: "border-box",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  links: {
    textDecoration: "none",
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    color: "rgba(0,0,0,.54)",
  },
  lastLink: {
    textDecoration: "none",
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    color: "black",
  },
}));

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
          let pathnames = window.location.pathname.split("/").filter((x) => x);
          return (
            <Breadcrumbs aria-label="breadcrumb">
              <Link to="/dashboard" className={classes.links}>
                Dashboard
              </Link>
              {pathnames.map((value, index) => {
                const last = index === pathnames.length - 1;
                pathnames = pathnames.filter((value) => {
                  return value !== "dashboard";
                });
                const to = `/dashboard/${pathnames
                  .slice(0, index + 1)
                  .join("/")}`;
                return last ? (
                  <Typography
                    color="textPrimary"
                    key={to}
                    className={classes.lastLink}
                  >
                    {pathnames[index]}
                  </Typography>
                ) : (
                  <Link
                    color="inherit"
                    to={to}
                    key={to}
                    className={classes.links}
                  >
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
