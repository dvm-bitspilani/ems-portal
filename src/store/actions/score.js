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

export const post_score_update = (parameters, ids, params_details, keylogs) => {
  // ------ prepare body to send over request ---------
  /*  structure of params_details [object] - may NOT contain all parameters 
      returned by backend as its formation depends upon the number of fields
      the judge has filled up.
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
      structure of parameters [array]-  will always contain all parameters
      returned by backend.
      [
        {
          parameter_id,
          parameter_instance_value,
          parameter_instance_comment
          ...
          ...
        }
        ...
        ...
      ]
  */
  const param_ids = [];
  const values = [];
  const comments = [];
  const keylogsArr = [];

  // if (Object.keys(params_details).length === 0) {
  //   parameters.forEach(parameter => {
  //     param_ids.push(parameter.parameter_id);
  //     values.push(parameter.parameter_instance_value);
  //     comments.push(parameter.parameter_instance_comment);
  //     keylogsArr.push("");
  //   });
  // } else {
  //   Object.keys(params_details).forEach(param => {
  //     let id = parseInt(param);
  //     if (id !== 0) {
  //       param_ids.push(id);
  //     }
  //   });
  //   param_ids.forEach(param => {
  //     values.push(parseInt(params_details[param].score));
  //     comments.push("");
  //   });
  //   Object.keys(keylogs).forEach(parameter_obj => {
  //     let keylogString = "";
  //     keylogs[parameter_obj].keylogs.forEach(char => {
  //       keylogString += char;
  //     });
  //     keylogsArr.push(keylogString);
  //   });
  // }

  // iterate through every parameter
  parameters.forEach(parameter => {
    // extract properties for this parameter
    const { parameter_id, parameter_instance_value } = parameter;

    // push parameter id
    param_ids.push(parameter_id);
    // push empty string to comments coz backend fucked up lmao
    comments.push("");

    if (Object.keys(params_details).indexOf(parameter_id.toString()) >= 0) {
      // params_details contains info for this parameter
      // implies that the judge HAS entered some score for this field

      // push score
      values.push(params_details[parameter_id].score);
      // prepare and push keylogs
      let keylogString = "";
      keylogs[parameter_id.toString()].keylogs.forEach(char => {
        keylogString += char;
      });
      keylogsArr.push(keylogString);

      // all items prepared fpr POST request
    } else {
      // the matching parameter does not exist
      // implies that Judge has NOT filled this field

      values.push(parameter_instance_value);
      keylogsArr.push("");
    }
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
    }).then(response => {
      if (response.status !== 200) {
        console.log(response)
        // handle all errors here
        window.alert(response.body.message);
      } else {
        response
          .json()
          .then(data => {
            dispatch(updateScore());
          })
          .catch(console.error);
      }
    });
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
