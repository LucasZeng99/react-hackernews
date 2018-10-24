import React, { Component } from 'react'
// import {fetchIDsByType, fetchItemsByIds} from '../api'
import { storeInitialItems, getActiveItemsByPage } from '../store'
class ListView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type: this.props.type,
      activeItems: [],
      page: 1
    }
  }

  componentWillMount () {
    storeInitialItems(this.state.type)
      .then(activeItems => {
        this.setState({
          activeItems
        })
      })
  }

  updatePage (pageNum) {
    if (!this.state.activeItems || pageNum < 1) {
      return
    }
    this.setState({
      activeItems: getActiveItemsByPage(pageNum),
      page: pageNum
    })
  }
  render () {
    return (
      <div className="list-view">
        This is list view.
        my props are: {this.props.type}
        <div className="item">
          {this.state.activeItems.map((item, i) => <ListCard item={item} key={i}/>)}
        </div>
        <div className="list-paginator">
          <p onClick={() => this.updatePage(this.state.page - 1)}>&lsaquo;prev</p><div>when page changes, update state.activeItems by fetching from store</div>
          <p onClick={() => this.updatePage(this.state.page + 1)}>next&rsaquo;</p>
        </div>
      </div>
    )
  }
}

function ListCard (props) {
  return <div className="list-item">
    <h2 className="list-item-title">{props.item.title}</h2>
  </div>
} 
export default ListView