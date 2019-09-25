import * as actionTypes from "../actions/actionTypes";

export const updateEventsList = events => {
  return {
    type: actionTypes.UPDATE_EVENTS_LIST,
    events: events
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
    fetch("http://test1.bits-oasis.org/ems/events/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access}`
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        dispatch(updateEventsList(data.events_info))
      })
      .catch(console.error);
  };
};
