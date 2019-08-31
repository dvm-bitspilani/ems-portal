import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Typography,
  Container
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";

// --------------------------------------------------------------------
// Uses standard material ui styles to generate a Google-style login page
// --------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  header: {
    marginTop: theme.spacing(5)
  },
  caption: {
    margin: theme.spacing(3)
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function SignIn() {
  const classes = useStyles();

  return (
    <Fragment>
      <Typography
        component="h1"
        variant="h3"
        align="center"
        className={classes.header}
      >
        OASIS'19 EMS
      </Typography>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Typography variant="h5" align="center" className={classes.caption}>
          Event Management System
        </Typography>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              component={Link}
              to="/ems"
            >
              Sign In
            </Button>
          </form>
        </div>
      </Container>
    </Fragment>
  );
}
