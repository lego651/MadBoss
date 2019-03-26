import axios from 'axios'

import constants from '../constants/plan'
import config from '../config.js'
import {history} from '../router/history';

// POST -> Create Plan
export function createPlan(planObj) {
  console.log('data in action is:', JSON.stringify(planObj))
  return function(dispatch) {
    const URL = config.serverUrl + '/plans'
    axios.post(URL, {planObj}, {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }
    })
    .then(response => {
      console.log(response)
      // return history.push('/app')
    })
    .catch(result => {
      console.log(result)
    })
  }
}

// GET -> Read Plan for certain userId
export function getUserPlan(toke6n=null){
  return function(dispatch) {
    if(token && token.length > 0) {
      const URL = config.serverUrl + '/plans'
      axios.get(URL, {
        headers: {
            'Authorization': token
        }
      })
      .then(response => {
        console.log(response.data)
        return dispatch(reducerSyncUserPlan(response.data.planList))
      })
      .catch(response => {
        console.log('getUserPlan action error.')
      })
    } else {
      return dispatch(reducerSyncUserPlan(null))
    }
  }
}
// GET -> get Plan Detail based on give Plan ID
export function getPlanDetail(id=null, token=null) {
  return function(dispatch) {
    if(id && id.length > 0 && token && token.length > 0) {
      const URL = config.serverUrl + "/plans/" + id
      axios.get(URL, {
        headers: {
            'Authorization': token
        }
      })
      .then(response => {
        return dispatch(reducerSyncPlanDetail(response.data.planDetail))
      })
      .catch(result => {
        console.log('getPlanDetail action error.')
      })
    } else {
      return dispatch(reducerSyncPlanDetail(null))
    }
  }
}

// Sync planList to reducer
export function reducerSyncUserPlan(data=null) {
  return function(dispatch) {
    return dispatch({
      type: constants.GET_USER_PLAN,
      data: data
    })
  }
}
// Sync planDetail to reducer
export function reducerSyncPlanDetail(data=null) {
  return function(dispatch) {
    return dispatch({
      type: constants.GET_PLAN_DETAIL,
      data: data
    })
  }
}
