import { combineReducers } from 'redux'
// import todos from './todos'
import auth from './auth'
import task from './task'
import plan from './plan'

export default combineReducers({
  task,
  auth,
  plan
})
