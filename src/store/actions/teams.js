import * as actionTypes from "./actionTypes";

export const populateTeams = (teamsList, eventId, levelId) => {
  return {
    type: actionTypes.POPULATE_TEAMS,
    teams: teamsList,
    eventId: eventId,
    levelId: levelId
  };
};

export const populateTeamInfo = teamInfo => {
  return {
    type: actionTypes.POPULATE_TEAM_INFO,
    teamInfo: teamInfo
  };
};

/* ------------------------------
GET INFO ABOUT A LEVEL
RESPONSE: {
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
    fetch(
      `http://test1.bits-oasis.org/ems/judge/events/${eventId}/levels/${levelId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access}`
        }
      }
    )
      .then(response => response.json())
      .then(data => {
        // data contains array "teams_info" with the team list
        console.log(data);
        dispatch(populateTeams(data.teams, eventId, levelId));
      })
      .catch(console.error);
  };
};

export const fetchTeamInfo = (eventId, levelId, teamId) => {
  const access = localStorage.getItem("access");
  return dispatch => {
    fetch(
      `http://test1.bits-oasis.org/ems/judge/events/${eventId}/levels/${levelId}/team/${teamId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access}`
        }
      }
    )
      .then(response => response.json())
      .then(data => {
        console.log(data);
        dispatch(populateTeamInfo(data));
      })
      .catch(console.error);
  };
};
