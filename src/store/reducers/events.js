import * as actionTypes from "../actions/actionTypes";

const initialState = {
  eventsList: [],
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.UPDATE_EVENTS_LIST:
      return {
        ...state,
        eventsList: action.events
      }
    default:
      return state
  }
}

export default reducer;