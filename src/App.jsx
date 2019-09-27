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
    let comp = this.state.competition;
    let date = this.state.matchDate;

    axios.get(`/fixtures/${this.state.competition}/${this.state.matchDate}`, { timeout: 10000 })
      .then(response => { //* First Checks for cached results *//
        if (response.data !== null) {
          console.log('Retrieved cached results!')
          this.setState({
            rankedMatches: response.data.fixtures
          });
        } else { //*Otherwise fetches data from api*//
          axios.get(`/api/fixtures/${comp}/${date}`)
            .then((response) => {
              console.log('OUR RESPONSE', response.data);
              this.setState({
                rankedMatches: response.data.fixtures
              });
              return response.data;
            })
            .then((data) => { //*Then stores results in the cache*//
              console.log('attempting to post data');
              return axios.post('/fixtures', {
                data: data
              })
            })
            .catch(err => {
              console.log('Error: axios get request - ', err);
            })
        }
      })
      .catch(err => {
        console.log('Error: axios get request - ', err);
      })

  }

  render() {
    return (
      <div className="App">
        <h1> Welcome to No Spoilers </h1>
        <div>
          <form onSubmit={this.handleSubmit}>
            <CompDropDown onChange={this.handleChange} />
            <div>
              <DatePicker name="matchDate" id="matchDate" text="Select Match Date:" value={this.state.matchDate} onChange={this.handleChange} />
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