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
  })
    .then(response => response.json())
    .then(data => {
      const tokens = {...data};
      // store token in localStorage
      localStorage.setItem("access", tokens["access"]);
      localStorage.setItem("refresh", tokens["refresh"])
      // store time of login to check session expiry
      localStorage.setItem("expiresIn", new Date());
    })
    .catch(console.error);
};

export const hasSessionExpired = () => {
  // checks if the current session has expired
  const expiresIn = localStorage.getItem("expiresIn");

  return (new Date() - expiresIn >= (60 * 60 * 1000)) ? true : false
} 

export const logout = () => {
  // remove auth credentials from localStorage
  localStorage.removeItem("access")
  localStorage.removeItem("refresh")
  localStorage.removeItem("expiresIn")
};
