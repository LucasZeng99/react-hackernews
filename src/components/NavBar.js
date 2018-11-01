import React from 'react'
import {NavLink} from 'react-router-dom'

export default function NavBar () {
  return (
    <div className="nav">
      <ul className="nav-container">
        <NavLink to="/" className="nav-link nav-title">HN</NavLink>
        <NavLink to="/top"  activeClassName="is-active" className="nav-link">Top</NavLink>
        <NavLink to="/new"  activeClassName="is-active" className="nav-link">New</NavLink>
        <NavLink to="/show" activeClassName="is-active" className="nav-link">Show</NavLink>
        <NavLink to="/ask"  activeClassName="is-active" className="nav-link">ask</NavLink>
        <NavLink to="/job"  activeClassName="is-active" className="nav-link">jobs</NavLink>
        <a className="github-link" href="https://github.com/LucasZeng99/react-hackernews">with &hearts; by Lucas Zeng</a>
      </ul>
    </div>
  )
}