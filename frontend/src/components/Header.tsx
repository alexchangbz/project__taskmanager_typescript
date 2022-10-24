import React from "react";
import { Link } from "react-router-dom";
import './header.css';

const Header = () => {
  return (
    <div className="header">
        <div className="brand">
            <h1>Streamframe</h1>
        </div>
        <ul>
            <li><Link to='/'>Dashboard</Link></li>
            <li><Link to='/create'>New Project</Link></li>
        </ul>
    </div>
  )
}

export default Header