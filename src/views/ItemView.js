import React, { Component } from 'react'
import { updateItemStore } from '../store/itemStore'
import { fetchItemById } from '../api'

import Comment from '../components/Comment'
export default class ItemView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      item: {
        title: '',
        url: '',
        kids: []
      },
      id: this.props.match.params.id,
      fetchedCount: -1,
      
    }
    fetchItemById(this.props.match.params.id)
      .then(item => {
        this.setState({
          item,
          kidsLength: item.descendants
        })
        console.log(item)
      })
      
    this.fetchComments(this.state.id)
  }

  fetchComments(id) {
    fetchItemById(id)
      .then(item => {
        // console.log("before children ids: ", item)
        let itemObj = {}
        itemObj[item.id] = item
        updateItemStore(itemObj)
        if (item.kids)  {
          item.kids.forEach(childId => {
            if (childId) this.fetchComments(childId)
          })
        }

        this.setState({
          fetchedCount: this.state.fetchedCount+ 1,
        })
      })
  }
  render () {
    if (this.state.fetchedCount >= this.state.kidsLength ){
      return (
        <div className="item-content">
          {this.props.match.params.id}
          <div className="item-title">{this.state.item.title}</div>
          <div className="item-url">{this.state.item.url}</div>
          <p>{this.state.item.text}</p>
          {this.state.item.kids.map((id, key)=> (
              <Comment id={id} key={id} layer={0}/>
          ))}
        </div>
      )
    }
    else {
      return (
        <div className="item-content">
          {this.props.match.params.id}
          <div className="item-title">{this.state.item.title}</div>
          <div className="item-url">{this.state.item.url}</div>
          </div>
      )
    }
  }
}