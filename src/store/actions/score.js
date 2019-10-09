import * as actions from "./actionTypes";

// access token to be included in all requests
const access = localStorage.getItem("access");
const rootURL = "http://test1.bits-oasis.org/ems/judge/events";

export const updateScore = () => {
  return {
    type: actions.UPDATE_SCORE
  }
}

export const freezeScore = () => {
  return {
    type: actions.FREEZE_SCORE
  }
}

export const post_score_update = (ids) => {
  const {eventId, levelId, teamId} = ids;

  fetch(`${rootURL}/${eventId}/levels/${levelId}/teams/${teamId}/score`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${access}`
    }
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(console.error);
};

export const post_score_freeze = (ids) => {
  const {eventId, levelId, teamId} = ids;

  fetch(`${rootURL}/${eventId}/levels/${levelId}/teams/${teamId}/score/freeze`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${access}`
    }
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(console.error);
}