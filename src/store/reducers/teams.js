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
        teams: action.teams,
        eventId: action.eventId,
        levelId: action.levelId
      };
    case actionTypes.POPULATE_TEAM_INFO:
      return {
        ...state,
        teamInfo: action.teamInfo,
        teamId: action.teamId
      }
    default:
      return state;
  }
};

export default reducer;
