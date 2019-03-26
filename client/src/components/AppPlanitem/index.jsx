import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from "react-router-dom";

import './app_planitem.scss'

class AppPlanitem extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { id, title } = this.props;
    return(
      <div className="app-planitem-wrapper">
        <Link to={"/plan/"+id}>
          { title }
        </Link>
      </div>
    )
  }
}

export default AppPlanitem
