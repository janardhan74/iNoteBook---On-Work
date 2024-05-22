import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Home from "./components/Home";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

import {  Routes, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
        <NoteState>
          <div className="App">
            <Navbar />
            <Alert message={"hi how are you"} />
            {/* <Router>
            <Switch>
              <Route exact path="/about">
                <About />
              </Route>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/login" >
                <Login />
              </Route>
              <Route exact path="/signup">
                <SignUp />
              </Route>
            </Switch>
          </Router> */}

            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<SignUp />} />
            </Routes>
          </div>
        </NoteState>
    );
  }
}

export default App;
