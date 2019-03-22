import constants from '../constants/auth'

var initialState = {
  error: '',
  logged: false,
  user: null,
}

export default(state = initialState, action) => {
  switch(action.type) {
    case constants.LOGGED_IN:
      return {...state, error: '', logged: true }
    case constants.GET_USER_INFO:
      return {...state, user: action.user }
    case constants.SIGN_OUT:
      return {...state, user: null, logged: false}
    default:
      return state
  }
}
