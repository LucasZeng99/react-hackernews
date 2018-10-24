import React, { Component } from 'react'
// import {fetchIDsByType, fetchItemsByIds} from '../api'
import { storeInitialItems, getActiveItemsByPage } from '../store'
import { Link } from 'react-router-dom'
class ListView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type: this.props.type,
      activeItems: [],
      page: 1,
      maxPage: 0
    }
  }

  componentWillMount () {
    storeInitialItems(this.state.type)
      .then(([activeItems, maxPage]) => {
        this.setState({
          activeItems,
          maxPage
        })
        console.log(this.state.maxPage)
      })
  }

  updatePage (pageNum) {
    if (!this.state.activeItems || pageNum < 1 || pageNum > this.state.maxPage) {
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
        <div className="list-paginator">
          <p onClick={() => this.updatePage(this.state.page - 1)}>&lsaquo;prev</p><div>when page changes, update state.activeItems by fetching from store</div>
          <p onClick={() => this.updatePage(this.state.page + 1)}>next&rsaquo;</p>
        </div>
        <div className="item">
          {this.state.activeItems.map((item, i) => <ListCard item={item} key={i}/>)}
        </div>
      </div>
    )
  }
}

class ListCard extends Component{
  titleLink () {
    let title = this.props.item.title
    if (this.props.item.url) {
      return <a href={this.props.item.url}>{title}</a>
    } else {
      return <Link to={'item/' + this.props.item.id}>{title}</Link>
    }
  }
  
  timeDiff (time) {
    let diff = Math.abs(new Date()/1000 - time)
    let hourDiff = diff/3600
    let res = hourDiff
    if (hourDiff >= 24) {
      res = hourDiff/24
    }
    res = Number.parseInt(res)
    let phrase = (hourDiff >= 24) ? 'day' : 'hour'
    if (res > 1) phrase += 's'
    return [res, phrase]
  }

  render () {
    let {by, id, score, time, type, kids} = this.props.item
    let [timeDiff, phrase] = this.timeDiff(time)
    return <div className="list-item">
      <div className="li-score">{score}</div>
      <div className="li-title">{this.titleLink()}</div>
      <div className="li-by">By {by}</div>
      <div className="li-time">{timeDiff} {phrase} ago</div>
      <div className="li-comments-link">
        <Link to={'item/' + id}>
          {kids && type !== 'job' ? (
            <p>{kids.length} comments</p>
          ) : (
            <p>{type}</p>
          )
          }
        </Link>
      </div>
    </div>
  }
} 
export default ListView