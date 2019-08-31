/* 
-------------------------
Utility functions for Authorization: login and logout
-------------------------
*/

const authURL = ""; // auth url goes here

export const login = (username, password) => {
  // send login request and if successful,
  // store credentials in localStorage

  const authData = { username, password };

  fetch(authURL, {
    method: "POST",
    body: JSON.stringify(authData),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(console.log, console.error); // for now, log any response to console
};

export const logout = () => {
  // remove auth credentials from localStorage
  // remaining
  return;
};
