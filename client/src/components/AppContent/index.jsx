import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from "react-router-dom";

import AppPlanlist from '../AppPlanlist'
import './app_content.scss'

class AppContent extends React.Component {
  constructor(props) {
    super(props)
  }
  renderEmpty() {
    return (
      <div className="empty-plan">
        <div className="empty-img">
          <img src="/images/undraw_no_data.svg" />
        </div>
        <h1> You don't have any plans yet. </h1>
        <button>
          <Link to="/create">Create Plan -></Link>
         </button>
      </div>
    )
  }
  renderPlanlist() {
    return (
      <AppPlanlist planList={this.props.planList}/>
    )
  }
  render() {
    let gmail = this.props.gmail
    let username = this.props.username.length > 0 ? this.props.username
                                                  : gmail.split('@')[0]
    let content = this.props.planList.length > 0
                  ? this.renderPlanlist()
                  : this.renderEmpty()
    return(
      <div className="app-content-wrapper">
        <div className="app-title">
          <div className="welcome-icon"> 👋</div>
          <h1> Welcome back, {username} ! </h1>
          <p> Here’s what you’ve been working on. You can always check progress later. </p>
        </div>
        { content }
      </div>
    )
  }
}

export default AppContent
