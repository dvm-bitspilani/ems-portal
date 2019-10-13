/* 
-------------------------
Utility functions for Authorization: 
1. login: accept credentials, send auth request, update localStorage with response data
2. logout: remove creds from localStorage
3. hasSessionExpired: check if current session has expired
4. refreshSession: get new access token from backend and restart session timer 
-------------------------
*/

export async function login(username, password) {
  // send login request and if successful,
  // store credentials in localStorage

  const authData = { username, password };

  await fetch("https://testwallet.bits-oasis.org/ems/jwt/get_token/", {
    method: "POST",
    body: JSON.stringify(authData),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
    .then(data => {
      const tokens = { ...data };
      // store token in localStorage
      localStorage.setItem("access", tokens["access"]);
      localStorage.setItem("refresh", tokens["refresh"]);
      // store time of login to check session expiry
      localStorage.setItem("expiresIn", new Date());
    })
    .catch(console.error);
};

export const hasSessionExpired = () => {
  // checks if the current session has expired
  const expiresIn = localStorage.getItem("expiresIn");
  // return if session has expired
  return new Date() - expiresIn >= 60 * 60 * 1000 ? true : false;
};

export const refreshSession = () => {
  const refreshToken = localStorage.getItem("refresh");

  fetch("https://testwallet.bits-oasis.org/ems/jwt/refresh_token", {
    method: "POST",
    body: JSON.stringify(refreshToken),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
    .then(data => {
      // get new access token
      const newAccess = data["access"];
      // set into local storage
      localStorage.setItem("access", newAccess);
      // refresh expiration time for current session
      localStorage.setItem("expiresIn", new Date());
      // window.location.href("/dashboard");
    })
    .catch(console.error);
};

export async function logout() {
  // remove auth credentials from localStorage
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  localStorage.removeItem("expiresIn");
  localStorage.removeItem("eventId");
  localStorage.removeItem("levelId");
  localStorage.removeItem("teamId");
};
