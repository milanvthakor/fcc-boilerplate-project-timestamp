// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Generate the object that will be returned to the client as a response
const generateResponse = (date) => ({
  unix: date.getTime(),
  utc: date.toUTCString()
});

// API endpoint for unix timestamp
app.get('/api/:providedDate?', (req, res) => {
  let { providedDate } = req.params;
  if (providedDate && providedDate !== '') {
    let date = new Date(
      // 5 digits or more must be timestamp, hence parse it into Number
      /\d{5,}/.test(providedDate) ? parseInt(providedDate) : providedDate
    );
    if (isNaN(date)) {
      res.json({ error: 'Invalid Date' });
    } else {
      res.json(generateResponse(date));
    }
  } else {
    res.json(generateResponse(new Date()));
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
