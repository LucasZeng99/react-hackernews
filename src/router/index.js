import React from 'react'
import { HashRouter as Router, Route} from "react-router-dom";

import NavBar from '../components/NavBar'
import ListView from '../views/ListView'
import ItemView from '../views/ItemView'

export default class HNRouter extends React.Component {
  // () => <ItemView/> will not work.
  render () {
    return (
      <Router>
        <div>
          <NavBar/>
          <Route exact path="/top"  component={()  => <ListView type="top"/>} />
          <Route exact path="/new"  component={()  => <ListView type="new"/>} />
          <Route exact path="/show" component={() => <ListView type="show"/>} />
          <Route exact path="/ask"  component={()  => <ListView type="ask"/>} />
          <Route exact path="/job"  component={()  => <ListView type="job"/>} />
          <Route path="/item/:id" component={ItemView} /> 
          </div>
      </Router>
    )
  }
}