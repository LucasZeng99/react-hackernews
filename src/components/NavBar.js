import React from 'react'
import {Link} from 'react-router-dom'

export default function NavBar () {
  return (
    <div className="nav">
      <ul className="nav-container">
        <Link to="/top" className="nav-link">Top</Link>
        <Link to="/new" className="nav-link">New</Link>
        <Link to="/show" className="nav-link">Show</Link>
        <Link to="/ask" className="nav-link">ask</Link>
        <Link to="/job" className="nav-link">jobs</Link>
      </ul>
    </div>
  )
}