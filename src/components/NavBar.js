import React from 'react'
import {Link} from 'react-router-dom'

export default function NavBar () {
  return (
    <div className="nav">
      <ul>
        <Link to="/top">Top</Link>
        <Link to="/new">New</Link>
        <Link to="/show">Show</Link>
        <Link to="/ask">ask</Link>
        <Link to="/job">jobs</Link>
      </ul>
    </div>
  )
}