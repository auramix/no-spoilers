import React, {
  Component
} from "react";
import "./App.css";
import CompDropDown from "./components/CompDropDown.jsx";
import DatePicker from "./components/DatePicker.jsx";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      competition: '',
      matchDate: '',
      rankedMatches: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    let name = e.target.name;
    this.setState({
      [name]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();

    axios.get('/fixtures', {
        params: {
          competition: this.stats.competition,
          date: this.state.matchDate
        }
      })
      .then(response => {
        this.setState({
          rankedMatches: response.data
        });
      })
      .catch(err => {
        console.log('Error: axios get request - ', err);
      })
  }

  render() {
    return ( < div className = "App" >
      <
      h1 > Welcome to No Spoilers < /h1> </div >
      <
      form onSubmit = {
        this.handleSubmit
      } >
      <
      CompDropDown onChange = {
        this.handleChange
      }
      /> <
      div >
      <
      DatePicker name = "matchDate"
      id = "matchDate"
      text = "Select Match Date:"
      value = {
        this.state.matchDate
      }
      onChange = {
        this.handleChange
      }
      /> < /
      div > <
      div >
      <
      input type = "submit"
      value = "Find Matches" > < /input> < /
      div > <
      /form> < /
      div > <
      /div>
    );
  }
}

export default App;