import * as actionTypes from "../actions/actionTypes";

export const updateLevel = (eventName , level) => {
    return {
      type: actionTypes.UPDATE_LEVEL,
      eventName: eventName,
      level: level
    };
};