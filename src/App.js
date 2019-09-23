import React, { Component} from "react";
import "./App.css";
import CompDropDown from "./components/CompDropDown.jsx";
import DatePicker from "./components/DatePicker.jsx";
import axios from "axios";
import config from "../server/axios/get_config";

class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      competition: '',
      dateFrom: '',
      dateTo: '',
      matches: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleCompetitionChange = this.handleCompetitionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    let name = e.target.name;
    this.setState({[name]: e.target.value})
  }

  handleCompetitionChange(e) {
    this.setState({'competition': e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault();

    config.url = `/${this.state.competition}/matches?dateFrom=${this.state.dateFrom}&dateTo=${this.state.dateTo}`;
    console.log('CONFIG: ', config);
    axios.request(config)
      .then(response => {
        const matches = response.data.matches;
        this.setState({matches: matches});
        console.log('Matches - ', matches);
      })
      .catch(err => {
        console.log('Error: axios get request - ', err);
      })
  }

  render(){
    return(
      <div className="App">
        <h1> Welcome to No Spoilers </h1>
        <div>
          <form onSubmit={this.handleSubmit}>
            <CompDropDown onChange={this.handleCompetitionChange}/>
            <div>
              <DatePicker name="dateFrom" id="dateFrom" text="Start Date:" value={this.state.dateFrom} onChange={this.handleChange}/>
              <DatePicker name="dateTo" id="dateTo" text="End Date:" value={this.state.dateTo} onChange={this.handleChange}/>
            </div>
            <div>
              <input type="submit" value="Find Matches"></input>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default App;