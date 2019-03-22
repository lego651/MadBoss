import { combineReducers } from 'redux'
// import todos from './todos'
import auth from './auth'
import task from './task'

export default combineReducers({
  task,
  auth
})
