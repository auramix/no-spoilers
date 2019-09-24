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
      matchDate: '',
      fixtures: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    let name = e.target.name;
    this.setState({[name]: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault();
    let url = `/fixtures/league/${this.state.competition}/${this.state.matchDate}`;

    axios.get(url, config)
      .then(response => {
        var fixtures = response.data.api.fixtures;
        this.setState({fixtures: fixtures});
        // console.log('Fixtures - ', fixtures);

        var fixtureEvents = fixtures.map(fixture => {
          let fixtureId = fixture.fixture_id;
          let url = `/events/${fixtureId}`;
          return axios.get(url, config);
        });

        return Promise.all(fixtureEvents);
      })
      .then(fixtureEvents => {
        console.log('Event values for fixtures', fixtureEvents);
        let fixtures = this.state.fixtures.slice();

        fixtures.forEach((fixture, i) => {
          fixture.events = fixtureEvents[i].data.api.events;
        })
        this.setState({fixtures: fixtures})
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
            <CompDropDown onChange={this.handleChange}/>
            <div>
              <DatePicker name="matchDate" id="matchDate" text="Select Match Date:" value={this.state.matchDate} onChange={this.handleChange}/>
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