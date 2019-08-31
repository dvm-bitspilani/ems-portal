import React from "react";
import Signin from "./components/Signin/Signin";
import mainPage from "./components/main/main";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Route path="/" exact component={Signin}/>
        <Route path="/mainPage/" component={mainPage} />      
      </div>
    </Router>
  );
}
export default App;
