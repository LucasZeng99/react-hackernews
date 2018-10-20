import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      count: 0,
    }
  }

  addOne = () => {
    console.log("added one", this)
    this.setState(state => ({
      count: state.count + 1
    }))
  }
  what = () => {
    console.log(this)
    return this
  }
  render() {
    return (
      <div className="App">
        <button onClick={this.addOne}> click me </button>
        <p>you clicked me {this.state.count} times.</p>
        <div className="this" onClick={this.what}><button>what is this fuck</button></div>
      </div>
    );
  }
}

export default App;
