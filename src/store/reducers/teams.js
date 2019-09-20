import * as actionTypes from "../actions/actionTypes";

const initialState = {
  teams: [],
  error: false
}

export const reducer = (state=initialState, action) => {
  switch(action.type) {
    case actionTypes.FETCH_EVENTS:
      return {
        ...state,
        error: false
      }
    case actionTypes.POPULATE_TEAMS:
      return {
        ...state,
        teams: action.teams,
      }
    default:
      return state
  }
}