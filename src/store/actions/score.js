import * as actions from "./actionTypes";

const rootURL = "https://testwallet.bits-oasis.org/ems/judge/events";

export const updateScore = () => {
  return {
    type: actions.UPDATE_SCORE
  };
};

export const freezeScore = (teamId) => {
  return {
    type: actions.FREEZE_SCORE,
    teamId: teamId
  };
};

export const populateParams = params_info => {
  return {
    type: actions.POPULATE_PARAMS,
    params_info: params_info
  };
};

export const fetch_params = ids => {
  const { eventId, levelId, teamId } = ids;
  const access = localStorage.getItem("access");
  return dispatch => {
    fetch(`${rootURL}/${eventId}/levels/${levelId}/teams/${teamId}/score`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access}`
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        dispatch(populateParams(data.parameters_info));
      })
      .catch(console.error);
  };
};

export const post_score_update = ids => {
  const { eventId, levelId, teamId } = ids;
  const access = localStorage.getItem("access");
  return dispatch => {
    fetch(`${rootURL}/${eventId}/levels/${levelId}/teams/${teamId}/score`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access}`
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        dispatch(updateScore());
      })
      .catch(console.error);
  };
};

export const post_score_freeze = ids => {
  const { eventId, levelId, teamId } = ids;
  const access = localStorage.getItem("access");
  return dispatch => {
    fetch(
      `${rootURL}/${eventId}/levels/${levelId}/teams/${teamId}/score/freeze`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access}`
        }
      }
    )
      .then(response => response.json())
      .then(data => {
        console.log(data);
        dispatch(freezeScore(teamId));
      })
      .catch(console.error);
  };
};
