import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from "react-router-dom";

import ButtonClose from '../ButtonClose'
import './plan_content.scss'

class PlanContent extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const id = this.props.match.params.id
    console.log(id)
    return(
      <div>
        <ButtonClose />
        <div className="plan-content-wrapper">
          <h1>📌 Finish mvp Design </h1>
          <h2>📅 &nbsp;&nbsp; Due Time: 2018/09/18 </h2>
          <div className="learned">
            <h1> Most 3 things I have learned here:</h1>
            <textarea placeholder="line-break&#x0a;hero" cols="30" rows="6">
            </textarea>
          </div>
          <div className="uploadImages">
            <h1> Proof of work </h1>
            Upload Image area
          </div>
          <div className="buttons">
            <button> Submit </button>
          </div>
        </div>
      </div>
    )

  }
}

export default PlanContent
