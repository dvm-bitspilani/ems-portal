import * as actionTypes from "./actionTypes";

export const populateTeams = teamsList => {
  return {
    type: actionTypes.POPULATE_TEAMS,
    teams: teamsList
  };
};

export const fetchTeams = (eventId, levelId) => {
  const access = localStorage.getItem("access");
  return dispatch => {
    fetch(`http://test1.bits-oasis.org/ems/events/${eventId}/level/${levelId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access}`
      }
    })
      .then(response => response.json())
      .then(data => {
        // data contains array "teams_info" with the team list
        console.log(data)
        dispatch(populateTeams(data.teams_info));
      })
      .catch(console.error);
  };
};
