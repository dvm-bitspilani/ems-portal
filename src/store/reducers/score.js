import  * as actions from "../actions/actionTypes";

const initialState = {};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actions.UPDATE_SCORE:
      return {
        ...state,
      }
    case actions.FREEZE_SCORE:
      return {
        ...state
      }
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
      }
    default:
      return state;
  }
}

export default reducer;