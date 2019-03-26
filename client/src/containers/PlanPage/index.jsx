import React from 'react'
import { connect } from 'react-redux'

import config from '../../config'
import { getPlanDetail } from '../../actions/plan'
import ButtonClose from '../../components/ButtonClose'

import './plan_page.scss'

class PlanPage extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    const token = localStorage.getItem('token')
    const id = this.props.match.params.id
    if(token && token.length > 0 && id && id.length > 0){
      this.props.getPlanDetail(id, token)
    } else {
      console.log('componentDidMount Error...')
    }
  }
  render() {
    const plan = this.props.planDetail
    const content = plan
      ? <div>
          <ButtonClose />
          <div className="plan-content-wrapper">
            <h1>📌 {plan.title} </h1>
            <h2>📅 &nbsp;&nbsp; Due Time:{plan.dueTime} </h2>
            <div className="learned">
              <h1> Most 3 things I have learned here:</h1>
              <textarea placeholder="line-break&#x0a;hero" cols="30" rows="6">
                {plan.learned}
              </textarea>
            </div>
            <div className="uploadImages">
              <h1> Proof of work </h1>
              Upload Image area
            </div>
            <div className="buttons">
              <button className="save"> Save </button>
              <button className="submit"> Submit </button>
            </div>
          </div>
        </div>
      : <div> Loading... </div>
    return(
      <div>
        { content }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  planDetail: state.plan.planDetail
})
const mapDispatchToProps = (dispatch) => ({
  getPlanDetail: (id, token) => dispatch(getPlanDetail(id, token))
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlanPage)
