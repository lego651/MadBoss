import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './toggle_sidenav.scss'

class ToggleSideNav extends React.Component {
  constructor(props) {
    super(props)
  }
  toggle(){
    this.props.toggleSideNav()
  }
  render() {
    const withNav = this.props.withNav
    return(
      <div className={'toggle-sidenav-wrapper ' + (withNav ? 'withNav' : '')}>
        <div onClick={() => this.toggle()} className="toggle-icon" >
          <FontAwesomeIcon icon="bars" />
        </div>
      </div>
    )
  }
}

export default ToggleSideNav
