import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from "react-router-dom";

import './sidenav.scss'

class SideNav extends React.Component {
  constructor(props) {
    super(props)
  }


  render() {
    let activeNav = this.props.activeNav
    return(
      <div className="sidenav-wrapper">
        <div className="sideLogo">
          <img src="/images/logo.png" />
        </div>
        <div className="nav-links">
          <div className="nav-link">
            <a href="/app" className={(activeNav === 'app' ? 'active' : 'not-active')}>
              <div className="nav-icon">
                <FontAwesomeIcon icon="home" />
              </div>
              <div className="nav"> Home </div>
            </a>
          </div>
          <div className="nav-link">
            <a href="/account" className={(activeNav === 'account' ? 'active' : 'not-active')}>
              <div className="nav-icon">
                <FontAwesomeIcon icon="user" />
              </div>
              <div className="nav"> Account </div>
            </a>
          </div>
        </div>
        <div className="create-plan">
          <Link to="/create">
            <div className="nav-icon">
              <FontAwesomeIcon icon="file-signature" />
            </div>
            <div className="create"> Create Plan </div>
          </Link>
        </div>
      </div>
    )
  }
}

export default SideNav
