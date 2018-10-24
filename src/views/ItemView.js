import React, { Component } from 'react'

export default class ItemView extends Component {
  componentDidMount () {
    console.log(this.props)
  }
  render () {
    return (
      <div className="item-content">
        {this.props.match.params.id}
      </div>
    )
  }
}