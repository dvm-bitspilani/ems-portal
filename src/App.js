import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./containers/Home/Home";
import SignIn from "./components/Signin/Signin";
import Level from "./containers/Level/level";
import AppBar from "./components/AppBar/AppBar";

function App() {
  const signIn=true;
  return (
      <Router>
        <Route component={SignIn} path="/" exact/>
        <Route component={AppBar} path="/dashboard" exact/>
        <Route component={Home} path="/dashboard" exact/> 
        <Route component={AppBar} path="/dashboard/level" exact/>
        <Route component={Level} path="/dashboard/level" />
      </Router>
  );
}
export default App;
