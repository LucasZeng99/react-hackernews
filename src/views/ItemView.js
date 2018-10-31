import React, { Component } from 'react'
import { updateItemStore } from '../store/itemStore'
import { fetchItemById } from '../api'

import Comment from '../components/Comment'
import { timeDiff, titleLink } from '../components/ListCard'
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

    // fetch the parent item
    fetchItemById(this.props.match.params.id)
      .then(item => {
        this.setState({
          item,
          kidsLength: item.descendants
        })
        // console.log(item)
      })
    
    this.fetchComments(this.state.id)
  }

  fetchComments(id) {
    // the initial call is duplicant.
    fetchItemById(id)
      .then(item => {
        // console.log("before children ids: ", item)
        let itemObj = {}
        itemObj[item.id] = item
        updateItemStore(itemObj)
        this.setState({
          fetchedCount: this.state.fetchedCount+ 1,
        })

        if (item.kids)  {
          item.kids.forEach(childId => {
            if (childId) this.fetchComments(childId)
          })
        }
      })
  }
  render () {
    // console.log("count: ",this.state.fetchedCount)
    if (this.state.fetchedCount >= this.state.kidsLength 
      ){
      return (
        <div className="item-content">
          <ItemHead item={this.state.item}/>
          {this.state.item.kids.map((id, key)=> (
              <Comment id={id} key={id} layer={0}/>
          ))}
        </div>
      )
    }
    else {
      return (
        <ItemHead item={this.state.item}/>
      )
    }
  }
}

let ItemHead = (props) => {
  let item = props.item
  if (!item) return;
  // console.log(item, item.time)
  let [timeDifference, phrase] = timeDiff(item.time)
  return (
    <div className="item-head">
          <div className="item-title">{item.title}</div>
          <div className="item-score">{item.score}</div>
          <div className="item-link">{titleLink(item)}</div>
          <div className="item-by">By {item.by}</div>
          <div className="item-time">{timeDifference} {phrase} ago </div>
          <div className="item-descendants">{item.descendants} comments</div>
    </div>
  )
}