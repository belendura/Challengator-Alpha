import React from 'react';
import {Route, Switch, Redirect} from "react-router-dom";

import Header from "./components/header/header.component";

import './App.css';

function App() {
  return (
    <div className="App">
      <Header/>
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
    </div>
  );
}

export default App;
