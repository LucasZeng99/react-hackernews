import React, { Component } from 'react'
import { fetch } from '../api'
class Home extends Component {
  constructor() {
    super()
    this.state = {

    }
  }
  componentWillMount () {
    fetch('topstories')
      .then(res => {
        console.log(res)
      })
  }
  render() {
    return ( 
      <div className = "Home" >
      <p> this is Home 哦， 是主页哦！ </p>
      </div>
    )
  }
}

export default Home