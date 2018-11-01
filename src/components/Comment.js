import React, { Component } from 'react'
import {fetchItemFromStore} from '../store/itemStore'
import { timeDiff } from './ListCard'
export default class Comment extends Component {
  // props: id of a comment.
  constructor(props) {
    super(props)
    this.state = {
      item: fetchItemFromStore(this.props.id),
      comments: [''],
      id: this.props.id,
      layer: this.props.layer,
      kids: [],
      toggle: true,
      toggleTxt: '[-]'
    }
    // console.log("item： ", this.state.item)
    // console.log(this.state.item.text)
  }

  componentDidMount () {
    this.fetchSubComments()
  }

  fetchSubComments() {
    if (this.state.item && this.state.item.kids) {
      this.setState({kids: this.state.item.kids})
    }
  }

  toggle () {
    if (this.state.toggle) {
      let item = this.state.item
      console.log(item)
      this.setState({
        toggle: false,
        toggleTxt: `[+] ${(item.kids && item.kids.length) || 1} folded`
      })
    }
    else {
      this.setState({
        toggle: true,
        toggleTxt: `[-]`
      })
    }
  }
  render () {
    let state = this.state
    if (this.state.item === undefined) return null
    let item = state.item
    return (
      <div className={`item-comment ${this.state.toggle?" ":"fold"}`}>
        <p className={"toggle"} onClick={() => this.toggle()}>{state.toggleTxt}</p>
        { this.state.toggle &&
          <>
            <div className="comment-meta">
              {`${item.by} ${timeDiff(item.time)[0]} ${timeDiff(item.time)[1]} ago`}
            </div>

            <div className="comment-inner" dangerouslySetInnerHTML={{__html: this.state.item.text}}></div>

            { this.state.kids 
              ? state.kids.map((id, key) => (<Comment id={id} key={id}/>))
              : (<div></div>)
            }
        </>
      }
      </div>
    )
  }
}