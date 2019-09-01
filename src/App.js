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
        <Route component={AppBar} path="/ems" exact/>
        <Route component={Home} path="/ems" exact/> 
        <Route component={AppBar} path="/ems/level" exact/>
        <Route component={Level} path="/ems/level" />
      </Router>
  );
}
export default App;
