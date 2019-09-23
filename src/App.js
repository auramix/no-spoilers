import React, { Component} from "react";
import "./App.css";
import CompDropDown from "./components/CompDropDown.jsx";
import DatePicker from "./components/DatePicker.jsx";

class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      competition: '',
      dateFrom: '',
      dateTo: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    let name = e.target.name;
    this.setState({[name]: e.target.value})
  }

  render(){
    return(
      <div className="App">
        <h1> Welcome to No Spoilers </h1>
        <div>
          <CompDropDown onChange={this.handleChange}/>
          <div>
          <DatePicker name="dateFrom" id="dateFrom" text="Start Date:" value={this.state.dateFrom} onChange={this.handleChange}/>
          <DatePicker name="dateTo" id="dateTo" text="End Date" value={this.state.dateTo} onChange={this.handleChange}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;