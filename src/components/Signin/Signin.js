import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import { login } from "../../utils/auth";

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
// import { Link } from "react-router-dom";

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
  },
  link: {
    color: theme.palette.common.white,
    textDecoration: "none"
  }
}));

function SignIn(props) {

  const classes = useStyles();
  const [username, setUser] = useState("");
  const [password, setPass] = useState("");

  return (
    <Fragment>
      <Typography
        component="h1"
        variant="h3"
        align="center"
        className={classes.header}
      >
        OASIS'23 EMS
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
              label="Username"
              name="email"
              autoFocus
              onChange={e => {
                setUser(e.target.value.toString());
              }}
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
              onChange={e => {
                setPass(e.target.value.toString());
              }}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => {
                login(username, password)
                  .then(() => {
                    if (localStorage.getItem("access") !== "undefined" && localStorage.getItem("access") !== null) {
                      props.history.push("/dashboard");
                      // eventsList().then(props.updateEventsList, console.error);
                      // props.fetchEvents();
                    } else {
                      console.error(
                        "Authentication failure - invalid credentials"
                      );
                    }
                  })
                  .catch(console.error);
              }}
            >
              Sign In
            </Button>
          </form>
        </div>
      </Container>
    </Fragment>
  );
}

const mapStatetoProps = state => {
  return {
    events: state.events.eventsList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchEvents: () => dispatch(actions.fetchEvents())
  };
};

export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(SignIn);
