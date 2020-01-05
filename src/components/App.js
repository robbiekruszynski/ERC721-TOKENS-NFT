import React, { Component } from "react";

import "./App.css";
import { Switch, Route } from "react-router-dom";
import Nav from "./Nav";
import Mint from "./Mint";

function App() {
  return (
    <div className="container">
      <Nav />
      <Mint />
    </div>
  );
}

export default App;
