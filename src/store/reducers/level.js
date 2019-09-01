import * as actionTypes from "../actions/actionTypes";

const initialState = {
   eventName : "Rap Wars ka Nanga Nach",
   level: 1
  };

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.UPDATE_LEVEL:
        {   
            console.log(state);
            return{
            ...state,
            eventName: action.eventName,
            level: action.level
            }
        }
        break;
        default:
            return state;
    }
}

export default reducer;