import React from 'react'
import axios from 'axios'
import Datetime from 'react-datetime'

import config from '../../config'
import { connect } from 'react-redux'
import { signIn, getUserInfo, reducerLoggedIn, signOut } from '../../actions/auth'
import { updateUsername } from '../../actions/userinfo'
import { createPlan } from '../../actions/plan'

import ButtonClose from '../../components/ButtonClose'
import './create_page.scss'

class CreatePage extends React.Component {
  constructor() {
      super();
      this.state = {
        title: '',
        dueTime: ''
      };
  }
  handleChange(e) {
    let item = e.target.name
    this.setState({
      [item]: e.target.value
    })
  }
  handleDate(moment) {
    this.setState({
      dueTime: moment._d
    })
    // console.log(this.state.date)
  }
  handleSubmit() {
    console.log(this.state)
    const planObj = {
      title: this.state.title,
      dueTime: this.state.dueTime
    }
    this.props.createPlan(planObj)
  }
  renderCalendar() {
    let yesterday = Datetime.moment().subtract( 1, 'day' );
    let valid = function( current ){
      return current.isAfter( yesterday );
    };
    return (<Datetime open={true}
                      isValidDate={ valid }
                      inputProps={{ disabled: true }}
                      onChange = {this.handleDate.bind(this)} />)
  }
  render() {
    return(
      <div>
        <ButtonClose />
        <div className="create-page-wrapper">
          <h1>📝 Create a new work plan </h1>
          <h2>📌 Boss, I am working on: </h2>
          <input name="title"
                 placeholder="Like 'Product' or 'Designing'"
                 onChange={(e) => {this.handleChange(e)}}
                 autofocus="true" />
          <h2>📅 I plan to finish this task by: </h2>
          <div className="calendar">
            { this.renderCalendar() }
          </div>
          <button onClick={() => this.handleSubmit()}> Create </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  todos: state.todos,
  user: state.auth.user
})
const mapDispatchToProps = (dispatch) => ({
  reducerLoggedIn: () => dispatch(reducerLoggedIn()),
  getUserInfo: (token) => dispatch(getUserInfo(token)),
  updateUsername: (username) => dispatch(updateUsername(username)),
  signOut: () => dispatch(signOut()),
  createPlan: (planObj) => dispatch(createPlan(planObj))
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatePage)
