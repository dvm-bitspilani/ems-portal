import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./containers/Home/Home";
import SignIn from "./components/Signin/Signin";
import Level from "./containers/Level/level";
import AppBar from "./components/AppBar/AppBar";
import Contacts from "./components/Contacts/Contacts";
import RouterBreadcrumbs from "./components/Breadcrumb/Breadcrumb";
import TeamInfo from "./components/TeamInfo/TeamInfo";

function App() {
  // const signIn=true;
  return (
    <div>
      <Router>
        <Route component={SignIn} path="/" exact />
        <Route component={AppBar} path="/dashboard" exact />
        <Route component={RouterBreadcrumbs} path="/dashboard" exact />
        <Route component={Home} path="/dashboard" exact />

        <Route component={AppBar} path="/dashboard/*" exact />
        <Route component={RouterBreadcrumbs} path="/dashboard/*" exact />
        <Route component={Level} path="/dashboard/*" />

        <Route component={AppBar} path="/team" />
        <Route component={TeamInfo} path="/team" />

        <Route component={Contacts} path="/contacts/" />
      </Router>
    </div>
  );
}
export default App;
