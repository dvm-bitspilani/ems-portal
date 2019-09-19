import * as actionTypes from "../actions/actionTypes";

export const updateEventsList = (events) => {
  return {
    type: actionTypes.UPDATE_EVENTS_LIST,
    events: events
  }
}