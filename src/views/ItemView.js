import React, { Component } from 'react'
import { updateItemStore } from '../store/itemStore'
import { fetchItemById } from '../api'

import Comment from '../components/Comment'
import { timeDiff, titleLink, urlHost } from '../components/ListCard'
export default class ItemView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      item: {
        title: '',
        url: '',
        kids: [],
      },
      update: false,
      id: this.props.match.params.id,
    }

    // fetch parent and all comments
    this.fetchComments(this.state.id, {})
  }

  async fetchComments(id) {
    let item = await fetchItemById(id)
    let isRootItem = (id === this.state.id)
    // set root to enable rerender
    if (isRootItem) this.setState({ item })

    // make a {id: item} object to merge with itemStore.
    let storeObj = {}
    storeObj[item.id] = item
    updateItemStore(storeObj)

    // wait and recursively fetch comments.
    if (item.kids) await Promise.all(item.kids.map(id => this.fetchComments(id)))
  
    // rerender after all fetch finished.
    if (isRootItem) this.setState({update: true})
  }

  render () {
    let state = this.state
    return (
      <div className="item-content">
        {state.item.title && (<ItemHead item={this.state.item}/>)}
        <div className="item-comments">
          <div className="comment-count">
            {state.item.title && 
              (state.item.descendants > 0 ? `${state.item.descendants} comments`
                                          : `0 comment`)}
          </div>
          {state.update && state.item.kids && state.item.kids.map(id => (
            <Comment id={id} key={id} layer={0}/>
          ))}
        </div>
      </div>
    )
  }
}

let ItemHead = (props) => {
  let item = props.item
  if (!item) return;
  // console.log(item, item.time)
  let [timeDifference, phrase] = timeDiff(item.time)
  return (
    <div className="item-head">
      <div className="item-title">
        {titleLink(item)}
        {urlHost(item.url) ? (<p>({urlHost(item.url)})</p>) : null}
      </div>
      <div className="item-meta">
        <div className="item-score">
          {item.score} 
          {item.score > 1 ? ' points' : ' point'}
        </div>
        <div>|</div>
        <div className="item-by">by {item.by},</div>
        <div className="item-time">{timeDifference} {phrase} ago </div>
      </div>
    </div>
  )
}