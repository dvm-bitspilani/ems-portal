import * as actionTypes from "./actionTypes";
const rootURL = "https://testwallet.bits-oasis.org/ems/judge/events";

export const populateTeams = (teamsList, eventId, levelId) => {
  return {
    type: actionTypes.POPULATE_TEAMS,
    teams: teamsList,
    eventId: eventId,
    levelId: levelId
  };
};

export const populateTeamInfo = (teamInfo, teamId) => {
  return {
    type: actionTypes.POPULATE_TEAM_INFO,
    teamInfo: teamInfo,
    teamId: teamId
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
    fetch(`${rootURL}/${eventId}/levels/${levelId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access}`
      }
    })
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
    fetch(`${rootURL}/${eventId}/levels/${levelId}/team/${teamId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access}`
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        dispatch(populateTeamInfo(data, teamId));
      })
      .catch(console.error);
  };
};
