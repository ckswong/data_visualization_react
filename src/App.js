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

  selectHandler = (evt, stateKey) => {
    const {state} = this;
    const updatedVal =  Number(evt.target.value);
    const isStateSame = state[stateKey] === updatedVal;
    if (!isStateSame) {
      let stateKeyValue = {};
      stateKeyValue[stateKey] = updatedVal;
      this.setState(stateKeyValue);
    }
  }

  /* Lifecycle Methods ---------------------------------- */

  componentDidMount() {
    fetch('./data.json')
    .then(response => response.json())
    .then(json => {this.setState({data: json, loading: false})});
  }

  render() {
    const {loading} = this.state;
    if(loading) return null

    return (
      <Chart {...this.state} {...this}/>
    );
  }
}

export default App;
