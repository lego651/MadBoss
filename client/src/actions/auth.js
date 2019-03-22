import axios from 'axios'

import {history} from '../router/history';
import constants from '../constants/auth'
import config from '../config'

export function signIn(data){
  return function(dispatch) {
    localStorage.setItem('token', data.token)
    localStorage.setItem('_id', data._id)
    localStorage.setItem('email', data.email)
    dispatch(reducerLoggedIn())
    dispatch(reducerSyncUserData(data))
    return history.push('/app');
  }
}

export function signOut(){
  return function(dispatch) {
    localStorage.removeItem('token')
    localStorage.removeItem('_id')
    localStorage.removeItem('email')
    return dispatch(reducerSignOut())
  }
}

export function getUserInfo(token) {
  return function(dispatch) {
    if(token && token.length > 0) {
      const URL = config.serverUrl + '/userinfo'
      axios.get(URL, {headers: {authorization: token}})
      .then(response => {
        return dispatch(reducerSyncUserData(response.data))
      })
      .catch(response => {
        console.log('getUserInfo action failed.')
      })
    } else {
      return dispatch(reducerSyncUserData(null))
    }
  }
}

export function getUserData(data) {
  return function(dispatch) {
    if(data.token && data.token.length > 0) {
      return dispatch(reducerSyncUserData(data))
    } else {
      return dispatch(reducerSyncUserData(null))
    }
  }
}

export function reducerLoggedIn(){
  return function(dispatch){
    return dispatch({
      type: constants.LOGGED_IN
    })
  }
}

export function reducerSyncUserData(data=null){
  return function(dispatch){
    return dispatch({
      type: constants.GET_USER_INFO,
      user: data
    })
  }
}

export function reducerSignOut() {
  return function(dispatch) {
    return dispatch({
      type: constants.SIGN_OUT
    })
  }
}
