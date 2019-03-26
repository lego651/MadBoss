import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from "react-router-dom";

import './button_close.scss'

class ButtonClose extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div className="button-close-wrapper">
        <a href="/app">
          <FontAwesomeIcon icon="times" />
        </a>
      </div>
    )
  }
}

export default ButtonClose
