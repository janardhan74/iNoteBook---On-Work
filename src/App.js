import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Home from "./components/Home";
import NoteState from "./context/notes/NoteState";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <NoteState>
        <div className="App">
          <Navbar />
          <Router>
            <Switch>
              <Route exact path="/about">
                <About />
              </Route>
              {/* <Route exact path="/users">
              <Users></Users>
            </Route> */}
              <Route exact path="/">
                <Home />
              </Route>
            </Switch>
          </Router>
        </div>
      </NoteState>
    );
  }
}

export default App;
