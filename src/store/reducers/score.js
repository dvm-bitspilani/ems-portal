import * as actions from "../actions/actionTypes";

const initialState = {
  updateScoreError: true
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.UPDATE_SCORE:
      return {
        ...state,
        updateScoreError: false
      };
      case actions.UPDATE_SCORE_ERROR:
        return {
          ...state,
          updateScoreError: true
        };
    case actions.FREEZE_SCORE:
      return {
        ...state
      };
    case actions.POPULATE_PARAMS:
      // for (let team in state.teams.teams) {
      //   if (team.id === action.teamId) {
      //     team.is_frozen = 1;
      //   }
      // }
      return {
        ...state,
        params_info: action.params_info,
        teamId: action.teamId
      };
    default:
      return state;
  }
};

export default reducer;
