import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import './homepage.scss'

class HomePage extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    return(
      <div className="homepage-wrapper">
        <div className="homesection-1">
          <div className="home-header">
            <div className="home-logo">
              <img src="/images/logo.png" />
            </div>
            <div className="home-links">
              <ul>
                <li>
                  <a href="/create"> Sign Up </a>
                </li>
                <li>
                  <a href="/login"> Login </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="content row">
            <div className="left-wrapper col-md-6 col-sm-12 col-12">
              <div className="left-content">
                <h1> Your new Journal </h1>
                <p> Organize all your content and ideas together in one place. Write, save for later, research, and plan projects big and small. </p>
                <button> Get early access </button>
              </div>
            </div>
            <div className="right-wrapper col-md-6 col-sm-12 col-12">
              <div className="right-content">
                <img src="/images/undraw_status_update.svg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default HomePage
