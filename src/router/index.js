import React from 'react'
import { HashRouter as Router, Route, Link } from "react-router-dom";

import Home from '../components/Home'

export default class HNRouter extends React.Component {
  render () {
    return (
      <Router>
        <div>
          <div className="nav">
            <ul>
              <Link to="/">Home</Link>
              <Link to="/page">Page</Link>
              <Link to="/about">About</Link>
            </ul>
          </div>
        
          <Route exact path="/" component={Home}/>
        </div>
      </Router>
    )
  }
}