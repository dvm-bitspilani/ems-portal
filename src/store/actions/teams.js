import * as actionTypes from "./actionTypes";

export const populateTeams = teamsList => {
  return {
    type: actionTypes.POPULATE_TEAMS,
    teams: teamsList
  };
};

/* ------------------------------
GET INFO ABOUT A LEVEL
response: {
  eventName,
  eventId,
  levelId,
  teams: [
    {
      teamName,
      teamId,
      score
    }
  ]
}
------------------------------ */

export const fetchTeams = (eventId, levelId) => {
  const access = localStorage.getItem("access");
  return dispatch => {
    fetch(`http://test1.bits-oasis.org/ems/judge/events/${eventId}/levels/${levelId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access}`
      }
    })
      .then(response => response.json())
      .then(data => {
        // data contains array "teams_info" with the team list
        console.log(data);
        dispatch(populateTeams(data.teams));
      })
      .catch(console.error);
  };
};
