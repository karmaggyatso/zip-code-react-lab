import React, { Component } from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function City(props) {
  return (
    <div className="container align-center card text-left mt-2" style = {{width: "26rem"}}>
      <h3 className = "card-title p-3">{props.data.City}, {props.data.State}</h3>
      <ul>
        <li>Population: {props.data.EstimatedPopulation}</li>
        <li>Location: ({props.data.Lat}, {props.data.Long})</li>
  <li>Total Wages: {props.data.totalWages}</li>
      </ul>
    </div>
  );
}
function ZipSearchField(props) {
  return (
    <div className = "container text-center m-3">
      Type in a zip code: <input type="text" onChange={(e) => props.zipChanged(e)} value={props.value} />
    </div>);
}
class App extends Component {
  state = {
    inputZip: "",
    cityResults: [],
  }
  handleZipChange(e) {
    this.setState({
      inputZip: e.target.value,
    })
    if(e.target.value.length === 5) {
      fetch("https://ctp-zip-api.herokuapp.com/zip/" + e.target.value)
        .then(res => res.json())
        .then(jsonData => {
          this.setState({
            cityResults: jsonData,
          })
        })
        .catch(err => {
          this.setState({ cityResults: [] })
        })
    } else {
      this.setState({ cityResults: [] })
    }
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField zipChanged={(e) => this.handleZipChange(e)} value={this.state.inputZip} />
        <div>
          { this.state.cityResults.map((item, index) => {
            return <City data={item} key={index} />;
          }) }
        </div>
      </div>
    );
  }
}
export default App;