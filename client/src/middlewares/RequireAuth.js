import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { redirectToLogin } from '../actions/index'
import { reducerLoggedIn, getUserInfo } from '../actions/auth'

export default function (ComposedComponent) {
  class Authenticate extends React.Component {
    componentDidMount() {
      this._checkAndRedirect();
    }
    componentWillUpdate() {
      this._checkAndRedirect();
    }
    _checkAndRedirect() {
      // const token = localStorage.getItem('token')
      // const reducerLoggedIn = this.props.reducerLoggedIn
      // const redirectToLogin = this.props.redirectToLogin
      // if(token && token.length > 0){
      //   reducerLoggedIn()
      // } else {
      //   redirectToLogin()
      // }
      const redirectToLogin = this.props.redirectToLogin
      const token = localStorage.getItem('token')
      if(!token || token.length == 0){
        redirectToLogin()
      }
    }
    render() {
      const token = localStorage.getItem('token')
      return (
        <div>
          { token ? <ComposedComponent {...this.props} /> : null }
        </div>
      );
    }
  }
  const mapStateToProps = (state) => {
    return {
      logged: state.auth.logged,
      user: state.auth.user
    };
  };
  const mapDispatchToProps = (dispatch) => ({
    redirectToLogin: () => dispatch(redirectToLogin()),
    reducerLoggedIn: () => dispatch(reducerLoggedIn()),
    getUserInfo: (token) => dispatch(getUserInfo(token))
  })
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(Authenticate);
}
