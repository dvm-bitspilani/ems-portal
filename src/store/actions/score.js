import * as actions from "./actionTypes";

// access token to be included in all requests
const access = localStorage.getItem("access");

export const post_score_update = () => {
  fetch("http://test1.bits-oasis.org/ems/judge/events/event_id/levels/level_id/teams/team_id/score", {
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

export const post_freeze_update = () => {
  fetch("http://test1.bits-oasis.org/ems/judge/events/event_id/levels/level_id/teams/team_id/score/freeze", {
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