import axios from 'axios'

import {history} from '../router/history';
import constants from '../constants/auth'
import config from '../config'

export function redirectToLogin(){
  return function(dispatch) {
    return history.push('/login');
  }
}

let nextTodoId = 2


export const addTodo = text => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text
})

export const deleteTodo = id => ({
  type: 'DELETE_TODO',
  id
})

// export const setVisibilityFilter = filter => ({
//   type: 'SET_VISIBILITY_FILTER',
//   filter
// })

// export const toggleTodo = id => ({
//   type: 'TOGGLE_TODO',
//   id
// })

// export const VisibilityFilters = {
//   SHOW_ALL: 'SHOW_ALL',
//   SHOW_COMPLETED: 'SHOW_COMPLETED',
//   SHOW_ACTIVE: 'SHOW_ACTIVE'
// }
