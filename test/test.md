# Node.js Quickstart

Complete the steps described in the rest of this page to create a simple Node.js command-line application that makes requests to the Google Calendar API.

## Prerequisites

To run this quickstart, you need the following prerequisites:

Node.js & npm installed.
A Google account with Google Calendar enabled

### Step 1: Turn on the Google Calendar API

Click this button to create a new Cloud Platform project and automatically enable the Google Calendar API:

Enable the Google Calendar API

In resulting dialog click DOWNLOAD CLIENT CONFIGURATION and save the file credentials.json to your working directory.

### Step 2: Install the client library

Run the following commands to install the libraries using npm:

npm install googleapis@39 --save

### Step 3: Set up the sample

Create a file named index.js in your working directory and copy in the following code:

calendar/quickstart/index.jsView on GitHub
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

// Load client secrets from a local file.
fs.readFile('credentials.json', (err, content) => {
if (err) return console.log('Error loading client secret file:', err);
// Authorize a client with credentials, then call the Google Calendar API.
authorize(JSON.parse(content), listEvents);
});

/\*\*

- Create an OAuth2 client with the given credentials, and then execute the
- given callback function.
- @param {Object} credentials The authorization client credentials.
- @param {function} callback The callback to call with the authorized client.
  \*/
  function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
  client_id, client_secret, redirect_uris[0]);

// Check if we have previously stored a token.
fs.readFile(TOKEN_PATH, (err, token) => {
if (err) return getAccessToken(oAuth2Client, callback);
oAuth2Client.setCredentials(JSON.parse(token));
callback(oAuth2Client);
});
}

/\*\*

- Get and store new token after prompting for user authorization, and then
- execute the given callback with the authorized OAuth2 client.
- @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
- @param {getEventsCallback} callback The callback for the authorized client.
  \*/
  function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
  rl.close();
  oAuth2Client.getToken(code, (err, token) => {
  if (err) return console.error('Error retrieving access token', err);
  oAuth2Client.setCredentials(token);
  // Store the token to disk for later program executions
  fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
  if (err) return console.error(err);
  console.log('Token stored to', TOKEN_PATH);
  });
  callback(oAuth2Client);
  });
  });
  }

/\*\*

- Lists the next 10 events on the user's primary calendar.
- @param {google.auth.OAuth2} auth An authorized OAuth2 client.
  \*/
  function listEvents(auth) {
  const calendar = google.calendar({version: 'v3', auth});
  calendar.events.list({
  calendarId: 'primary',
  timeMin: (new Date()).toISOString(),
  maxResults: 10,
  singleEvents: true,
  orderBy: 'startTime',
  }, (err, res) => {
  if (err) return console.log('The API returned an error: ' + err);
  const events = res.data.items;
  if (events.length) {
  console.log('Upcoming 10 events:');
  events.map((event, i) => {
  const start = event.start.dateTime || event.start.date;
  console.log(`${start} - ${event.summary}`);
  });
  } else {
  console.log('No upcoming events found.');
  }
  });
  }

### Step 4: Run the sample

Run the sample using the following command:

node .

The first time you run the sample, it will prompt you to authorize access:

Browse to the provided URL in your web browser.

If you are not already logged into your Google account, you will be prompted to log in. If you are logged into multiple Google accounts, you will be asked to select one account to use for the authorization.

Click the Accept button.
Copy the code you're given, paste it into the command-line prompt, and press Enter.
done It worked!
warning There was a problem

## Notes

Authorization information is stored on the file system, so subsequent executions will not prompt for authorization.
The authorization flow in this example is designed for a command line application. For information on how to perform authorization in other contexts, see the Authorizing and Authenticating. section of the library's README.

## Further reading

Google APIs Client for Node.js documentation
Create events
Calendar API reference documentation
Troubleshooting
This section describes some common issues that you may encounter while attempting to run this quickstart and suggests possible solutions.

This app isn't verified.
The OAuth consent screen that is presented to the user may show the warning "This app isn't verified" if it is requesting scopes that provide access to sensitive user data. These applications must eventually go through the verification process to remove that warning and other limitations. During the development phase you can continue past this warning by clicking Advanced > Go to {Project Name} (unsafe).
