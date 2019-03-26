import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from "react-router-dom";

import AppPlanitem from '../AppPlanitem'
import './app_planlist.scss'

class AppPlanlist extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const planList = this.props.planList
    console.log(planList)
    return(
      <div className="app-planlist-wrapper">
        <div className="planlist-header">
          <div className="left"> your work plans </div>
          <div className="right">
            <Link to="/create">
              <div className="nav-icon">
                <FontAwesomeIcon icon="file-signature" />
              </div>
              <div className="create"> Create Plan </div>
            </Link>
          </div>
        </div>
        <div className="planlist-content">
            {
              planList.map((plan, key) => {
                return <AppPlanitem key={key}
                                    id={plan.id}
                                    title={plan.title}
                                    createdTime={plan.createdTime}
                                    dueTime={plan.dueTime} />
              })
            }
        </div>
      </div>
    )
  }
}

export default AppPlanlist
