import * as actionTypes from "../actions/actionTypes";

const initialState = {
   eventName : "Rap Wars",
   level: 1
  };

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.UPDATE_LEVEL:
        {   
            return{
            ...state
            }
        }
        break;
        default:
            return state;
    }
}

export default reducer;