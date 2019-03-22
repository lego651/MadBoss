import React from 'react'
import { GoogleLogin } from 'react-google-login'
import axios from 'axios'

import config from '../../config'
import { connect } from 'react-redux'
import { signIn, getUserInfo, reducerLoggedIn, signOut } from '../../actions/auth'
import { updateUsername } from '../../actions/userinfo'
import SideNav from '../../components/SideNav'
import AccountContent from '../../components/AccountContent'
import ToggleSideNav from '../../components/ToggleSideNav'

import './account_page.scss'

class AccountPage extends React.Component {
  constructor() {
      super();
      this.state = {
        showSidenav: true,
      };
  }
  logout = () => {
      this.setState({isAuthenticated: false, token: '', user: null})
  };
  toggle() {
    this.setState((prevState, props) => ({
      showSidenav: !prevState.showSidenav
    }));
  }
  updateUsername(username) {
    this.props.updateUsername(username)
  }
  userSignOut() {
    this.props.signOut()
  }
  componentDidMount(){
    const reducerLoggedIn = this.props.reducerLoggedIn
    const getUserInfo = this.props.getUserInfo
    const signOut = this.props.signOut
    const token = localStorage.getItem('token')
    if(token && token.length > 0){
      reducerLoggedIn()
      getUserInfo(token)
    } else {
      console.log('No token in Header Container')
    }
  }
  render() {
    let withNav = this.state.showSidenav
    let content = this.props.user
        ? <AccountContent gmail={this.props.user.email}
                          username={this.props.user.username}
                          updateUsername={this.updateUsername.bind(this)}
                          signOut={this.userSignOut.bind(this)} />
        : <div className="c"> loading... </div>

    return(
      <div className="account-page-wrapper">
        <ToggleSideNav
          withNav={withNav}
          toggleSideNav={this.toggle.bind(this)} />
        { withNav ? <SideNav activeNav={"account"} /> : null }
        <div className={'content ' + (withNav ? 'withNav' : '')}>
          { content }
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
  signOut: () => dispatch(signOut())
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountPage)
