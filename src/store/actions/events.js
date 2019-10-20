import * as actionTypes from "../actions/actionTypes";

export const updateEventsList = events => {
  return {
    type: actionTypes.UPDATE_EVENTS_LIST,
    events: events ? events : []
  };
};

/* ---------------------
GET LIST OF EVENTS -
response: 
{
  eventName,
  eventId,
  levelsInfo: {
    levelName,
    levelId
  }
}
----------------------- */

export const fetchEvents = () => {
  const access = localStorage.getItem("access");
  return dispatch => {
    fetch("https://www.bits-oasis.org/ems/events/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access}`
      }
    })
      .then(response => response.json())
      .then(data => {
        dispatch(updateEventsList(data.events_info));
      })
      .catch(console.error);
  };
};

export const fetchLevels = eventId => {
  const access = localStorage.getItem("access");
  return dispatch => {
    fetch(`https://testwallet.bits-oasis.org/ems/judge/event/${eventId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access}`
      }
    })
      .then(response => response.json())
      .then(data => {
        //dispatch action to update levels for this event
      })
      .catch(console.error);
  };
};
