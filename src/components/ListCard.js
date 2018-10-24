import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class ListCard extends Component{
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
      <div className="li-score"> {score} </div>
      <div className="li-title-link"> {this.titleLink()} </div>
      <div className="li-by">By {by} </div>
      <div className="li-time"> {timeDiff} {phrase} ago </div>
      <div className="li-item-link">
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