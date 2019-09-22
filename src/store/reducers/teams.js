import * as actionTypes from "../actions/actionTypes";

const initialState = {
  teams: [],
  error: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.POPULATE_TEAMS:
      return {
        ...state,
        teams: action.teams
      };
    case actionTypes.FETCH_TEAMS:
      return {
        ...state,
        error: false
      };
    default:
      return state;
  }
};

export default reducer;
