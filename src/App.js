import React, { Component } from 'react';

import Chart from './components/Chart/Chart.js'

class App extends Component {

  state = {
    year: 2018,
    minThreshold: 3,
    data: null,
    loading: true
  }

  /* Handlers ------------------------------------------ */

  yearSelectHandler = (evt) => {
    const {year} = this.state;
    const updatedVal =  Number(evt.target.value);
    const isStateSame = year === updatedVal;
    if (!isStateSame) {
      this.setState({year: updatedVal});
    }
  }

  thresholdSelectHandler = (evt) => {
    const {minThreshold} = this.state;
    const updatedVal =  Number(evt.target.value);
    const isStateSame = minThreshold === updatedVal;
    if (!isStateSame) {
      this.setState({minThreshold: updatedVal});
    }
  }

  /* Lifecycle Methods ---------------------------------- */

  componentDidMount() {
    fetch('./data.json')
    .then(response => response.json())
    .then(json => {
      this.setState({
        data: json, 
        loading: false
      })
    });
  }

  render() {
    const {loading} = this.state;
    const {thresholdSelectHandler, yearSelectHandler} = this;
    if(loading) {return null}

    return (
      <Chart {...this.state} thresholdSelectHandler={thresholdSelectHandler} yearSelectHandler={yearSelectHandler}/>
    );
  }
}

export default App;
