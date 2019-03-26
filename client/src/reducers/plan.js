import constants from '../constants/plan'

var initialState = {
  planList: [],
  planDetail: null,
}

export default (state = initialState, action)  => {
  switch(action.type) {
    case constants.GET_USER_PLAN:
      return {
        planList: [...state.planList, ...action.data]
      }
    case constants.GET_PLAN_DETAIL:
      return {
        planDetail: action.data
      }
    default:
      return state
  }
}
