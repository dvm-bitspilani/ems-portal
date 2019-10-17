import * as actions from "./actionTypes";

const rootURL = "https://www.bits-oasis.org/ems/judge/events";

export const updateScore = () => {
  return {
    type: actions.UPDATE_SCORE
  };
};

export const freezeScore = teamId => {
  return {
    type: actions.FREEZE_SCORE,
    teamId: teamId
  };
};

export const populateParams = data => {
  return {
    type: actions.POPULATE_PARAMS,
    params_info: data.parameters_info,
    teamId: data.team_id
  };
};

export const fetch_params = ids => {
  const { teamId } = ids;
  const eventId = localStorage.getItem("eventId");
  const levelId = localStorage.getItem("levelId");
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
        dispatch(populateParams(data));
      })
      .catch(console.error);
  };
};

export const post_score_update = (ids, params_details, keylogs) => {
  // ------ prepare body to send over request ---------
  /*  structure of params_details
    {
     1:{
       score: "",
       comments: ""
     }
     2: {
       score: "",
       comments: ""
     }
     ...
     ...
   }
  */
  const param_ids = [];
  const values = [];
  const comments = [];
  const keylogsArr = [];
  // eslint-disable-next-line no-unused-vars
  // for (let param in params_details) {
  //   if (param === 0) continue;
  //   param_ids.push(param);
  // }

  Object.keys(params_details).forEach(param => {
    let id = parseInt(param);
    if (id !== 0) {
      param_ids.push(id);
    }
  });
  param_ids.forEach(param => {
    // let score = params_details[param].score !== "" ? params_details[param].score : 0;
    values.push(parseInt(params_details[param].score));
    comments.push("");
  });
  Object.keys(keylogs).forEach(parameter_obj => {
    let keylogString = "";
    keylogs[parameter_obj].keylogs.forEach(char => {
      keylogString += char;
    });
    keylogsArr.push(keylogString);
  });
  // arrays populated
  // make object to be stringified later and
  // populate object with above arrays
  const postData = {};
  postData["param_ids"] = param_ids;
  postData["values"] = values;
  postData["comments"] = comments;
  postData["keylogs"] = keylogsArr;

  console.log(postData);

  // ---------------------------------------------------

  const { teamId } = ids;
  const access = localStorage.getItem("access");
  const eventId = localStorage.getItem("eventId");
  const levelId = localStorage.getItem("levelId");
  return dispatch => {
    fetch(`${rootURL}/${eventId}/levels/${levelId}/teams/${teamId}/score/`, {
      method: "POST",
      // body: JSON.stringify(postData),
      body: JSON.stringify(postData),
      headers: {
        Authorization: `Bearer ${access}`,
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        dispatch(updateScore());
      })
      .catch(console.error);
  };
};

export const post_score_freeze = ids => {
  const { teamId } = ids;
  const access = localStorage.getItem("access");
  const eventId = localStorage.getItem("eventId");
  const levelId = localStorage.getItem("levelId");
  return dispatch => {
    fetch(
      `${rootURL}/${eventId}/levels/${levelId}/teams/${teamId}/score/freeze`,
      {
        method: "POST",
        body: JSON.stringify({}),
        headers: {
          Authorization: `Bearer ${access}`
        }
      }
    )
      .then(response => response.json())
      .then(data => {
        dispatch(freezeScore(teamId));
      })
      .catch(console.error);
  };
};
