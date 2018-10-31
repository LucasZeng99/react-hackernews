import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export function timeDiff (time) {
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

export function titleLink (item) {
  let title = item.title
  if (item.url) {
    return <a href={item.url}>{title}</a>
  } else {
    return <Link to={'item/' + item.id}>{title}</Link>
  }
}

export function urlHost (url) {
  let secondSlash, thirdSlash = 0;
  for (let i = 0; i < 3; i++) {
    thirdSlash = url.indexOf('/', thirdSlash + 1)
    if (i < 2) {
      secondSlash = thirdSlash
    }
  }
  return url.slice(secondSlash + 1, thirdSlash)
}

export class ListCard extends Component{
  timeDiff = (time) => timeDiff(time) // map modular functions to local methods
  titleLink = (item) => titleLink(item)
  render () {
    console.log(this.props.item)
    let {by, id, score, time, type, descendants} = this.props.item
    let [timeDiff, phrase] = this.timeDiff(time)
    
    return <div className="list-item">
      <div className="li-score"> {score} </div>
      
      <div className="li-title">
        <div className="li-title-link"> {this.titleLink(this.props.item)} </div>
        {urlHost(this.props.item.url)}
      </div>

      <div className="li-meta">
        <div className="li-by">by {by} </div>
        <div className="li-time"> {timeDiff} {phrase} ago </div>
        <Link to={'item/' + id}>
          {descendants && type !== 'job' ? (
            <p>{descendants} comments</p>
          ) : (
            <p>{type}</p>
          )
          }
        </Link>
      </div>
    </div>
  }
}
