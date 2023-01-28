import fetch from "node-fetch";
import { exec } from "child_process";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
// auth token can be found with dev tools from a logged in session
const authToken = "insert auth token";
// location id can be found in their api calls. SFO = 5446
const locationId = "insert location id"
let count = 0;
while (true) {
  // assumes SFO location - swap locationId to your preferred location
  const result = await fetch(`https://ttp.cbp.dhs.gov/schedulerapi/slots?orderBy=soonest&limit=1&locationId=${locationId}&minimum=1`, {
    "headers": {
      "accept": "application/json, text/plain, */*",
      "accept-language": "en-US,en;q=0.9",
      "authorization": authToken,
      "cache-control": "no-cache",
      "pragma": "no-cache",
      "sec-ch-ua": "\"Not_A Brand\";v=\"99\", \"Google Chrome\";v=\"109\", \"Chromium\";v=\"109\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"macOS\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "cookie": "insert cookies",
      "Referer": "https://ttp.cbp.dhs.gov/schedulerui/",
      "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "body": null,
    "method": "GET"
  });

  const data = await result.json();
  const length = await data.length;
  count += 1;
  console.log("count", count);
  if (length > 0) {
    exec(`osascript -e 'display notification "Appointment available" with title "Global Entry"'`);
    break;
  }
  await sleep(30000);
}

