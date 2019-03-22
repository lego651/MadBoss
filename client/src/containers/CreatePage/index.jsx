import React from 'react'
import axios from 'axios'
import Datetime from 'react-datetime'

import config from '../../config'
import { connect } from 'react-redux'
import { signIn, getUserInfo, reducerLoggedIn, signOut } from '../../actions/auth'
import { updateUsername } from '../../actions/userinfo'

import './create_page.scss'

class CreatePage extends React.Component {
  constructor() {
      super();
      this.state = {

      };
  }
  renderCalendar() {
    let yesterday = Datetime.moment().subtract( 1, 'day' );
    let valid = function( current ){
      return current.isAfter( yesterday );
    };
    return (<Datetime open={true}
                      isValidDate={ valid }
                      inputProps={{ disabled: true }} />)
  }
  render() {
    return(
      <div className="create-page-wrapper">
        <h1>📝 Create a new work plan </h1>
        <h2>📌 Boss, I am working on: </h2>
        <input placeholder="Like 'Product' or 'Designing'"/>
        <h2>📅 I plan to finish this task by: </h2>
        <div className="calendar">
          { this.renderCalendar() }
        </div>
        <button> Create </button>
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
  signOut: () => dispatch(signOut())
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatePage)
