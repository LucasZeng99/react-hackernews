import React, { Component } from 'react'
import { initItemStore } from '../store'
import { fetchItemsByIds } from '../api'
export default class ItemView extends Component {
  constructor() {
    super()
    this.state = {
      item: {
        title: '',
        url: '',
        kids: []
      }
    }
  }
  componentWillMount () {
    initItemStore(this.props.match.params.id)
      .then(item => {
        this.setState({
          item
        })
      })
  }

  render () {
    return (
      <div className="item-content">
        {this.props.match.params.id}
        <div className="item-title">{this.state.item.title}</div>
        <div className="item-url">{this.state.item.url}</div>
      </div>
    )
  }
}