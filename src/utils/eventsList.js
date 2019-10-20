export default async function fetchEvents() {
  //fetch list of events once user is logged in
  const access = localStorage.getItem("access");

  await fetch("https://testwallet.bits-oasis.org/ems/events/", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access}`
    }
  })
    .then(response => response.json())
    // data will contain the list of events
    .then(data => {
      return data;
      // populate events list with this data
    })
    .catch(console.error);
}
