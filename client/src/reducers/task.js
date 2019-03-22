import constants from '../constants/task'

var initialState = {
  tasks: [
    {
      content: 'task1'
    }
  ],
  done: []
}

const removeById = (array, id) => {
  return array.filter((item) => item.id !== id)
}

export default(state = initialState, action) => {
  switch(action.type) {
    case constants.GET_USER_TASKS:
      return {
        tasks: [...state.tasks, ...action.data]
      }
    case constants.GET_USER_DONE:
      return {
        done: [...state.done, ...action.data]
      }
    case constants.TASK_ADD:
      return {
        ...state,
        tasks: [...state.tasks, {
          content: action.content,
          id: action.id
        }]
      }
    case constants.TASK_DELETE:
      return {
        ...state,
        tasks: removeById(state.tasks, action.id)
      }
    default:
      return state;
  }
}
