import axios from 'axios'

import constants from '../constants/task'
import config from '../config.js'

// POST add new task
export function addTask(taskContent) {
  return function(dispatch){
    const URL = config.serverUrl + '/tasks'
    axios.post(URL, {content: taskContent},{
      headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
      }
    })
      .then(response => {
        return dispatch({
          type: constants.TASK_ADD,
          content: response.data.content,
          id: response.data.id
        })
      })
      .catch(result => {
        console.log(result)
      })
  }
}

// POST delete task
export function deleteTask(id){
  console.log('data in action is:' + id)
  return function(dispatch) {
    const URL = config.serverUrl + '/delete'
    axios.post(URL, {task_id: id}, {
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        }
      })
      .then(response => {
        return dispatch({
          type: constants.TASK_DELETE,
          id: id
        })
      })
      .catch(result => {
        console.log(result)
      })
  }
}

// GET user tasks list
export function getUserTasks(token=null) {
    return function(dispatch) {
      if(token && token.length > 0) {
        const URL = config.serverUrl + '/tasks'
        axios.get(URL, {headers: {authorization: token} })
          .then(response => {
            return dispatch(reducerSyncUserTasks(response.data.tasksList))
          })
          .catch(response => {
            console.log('getUserTasks actions error.')
          })
      } else {
        return dispatch(reducerSyncUserTasks(null))
      }
    }
}

// Sync tasks list data to reducer
export function reducerSyncUserTasks(data=null) {
  return function(dispatch) {
    return dispatch({
      type: constants.GET_USER_TASKS,
      data: data
    })
  }
}
