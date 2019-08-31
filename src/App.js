import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./containers/Home/Home";
import SignIn from "./components/Signin/Signin";

function App() {
  return (
    <Router>
      <Route component={SignIn} path="/" exact/>
      <Route component={Home} path="/ems" exact />
    </Router>
  );
}
export default App;
