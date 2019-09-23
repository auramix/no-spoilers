import React, { Component} from "react";
import "./App.css";
import CompDropDown from "./components/CompDropDown.jsx"

class App extends Component{
  render(){
    return(
      <div className="App">
        <h1> Welcome to No Spoilers </h1>
        <div>
          <CompDropDown />
        </div>
      </div>
    );
  }
}

export default App;