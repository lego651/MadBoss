import React from 'react'
import { GoogleLogin } from 'react-google-login'
import axios from 'axios'

import config from '../../config'
import { connect } from 'react-redux'
import { signIn, getUserInfo, reducerLoggedIn } from '../../actions/auth'
import SideNav from '../../components/SideNav'
import AppContent from '../../components/AppContent'
import ToggleSideNav from '../../components/ToggleSideNav'

import './app_page.scss'

class AppPage extends React.Component {
  constructor() {
      super();
      this.state = {
        showSidenav: true,
      };
  }
  componentDidMount(){
    const reducerLoggedIn = this.props.reducerLoggedIn
    const getUserInfo = this.props.getUserInfo
    const token = localStorage.getItem('token')
    if(token && token.length > 0){
      reducerLoggedIn()
      getUserInfo(token)
    } else {
      console.log('No token in Header Container')
    }
  }
  toggle() {
    this.setState((prevState, props) => ({
      showSidenav: !prevState.showSidenav
    }));
  }
  render() {
    let withNav = this.state.showSidenav
    let content = this.props.user
        ? <AppContent gmail={this.props.user.email}
                      username={this.props.user.username} />
        : <div className="c"> loading... </div>

    return(
      <div className="app-page-wrapper">
        <ToggleSideNav
          withNav={withNav}
          toggleSideNav={this.toggle.bind(this)} />
        { withNav ?  <SideNav activeNav={"app"} /> : null }
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
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppPage)
