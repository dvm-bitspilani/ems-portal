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
    default:
      return state;
  }
}

export default reducer;