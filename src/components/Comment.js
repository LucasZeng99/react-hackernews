import React, { Component } from 'react'
import {fetchItemFromStore} from '../store/itemStore'

export default class Comment extends Component {
  // props: id of a comment.
  constructor(props) {
    super(props)
    this.state = {
      item: fetchItemFromStore(this.props.id),
      comments: [''],
      id: this.props.id,
      layer: this.props.layer,
      kids: []
    }
    // console.log("item： ", this.state.item)
  }

  componentDidMount () {
    this.fetchSubComments()
  }

  fetchSubComments() {
    if (this.state.item && this.state.item.kids) {
      this.setState({kids: this.state.item.kids})
    }
  }

  render () {
    console.log("comment rendered")
    let layer = this.state.layer
    if (this.state.item === undefined) return null
    return (
      <div className={`item-comment comment-layer-${layer}`}>
        <div dangerouslySetInnerHTML={{__html: this.state.item.text}}></div>
          { this.state.kids ? 
              (
                <div>
                  {this.state.kids.map((id, key) => 
                    (
                      <Comment id={id} key={id} layer={this.state.layer + 1}/>
                    )
                  )}
                </div>
              )
              : (<div></div>)
          }
      </div>
    )
  }
}