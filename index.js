// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.get("/api/:date?", function (req, res) {
  const dateParam = req.params.date;

  // Usar la fecha actual si esta vacio
  if (!dateParam) {
    const current = new Date();
    return res.json({
      unix: current.getTime(),
      utc: current.toUTCString()
    });
  }

  let dateObj;

  // timestamp Unix
  if (/^\d+$/.test(dateParam)) {
    dateObj = new Date(parseInt(dateParam));
  } else {
    // 3. Si es una cadena de texto (ej. "2015-12-25")
    dateObj = new Date(dateParam);
  }

  // Validador de fecha
  if (dateObj.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // JSON
  return res.json({
    unix: dateObj.getTime(),
    utc: dateObj.toUTCString()
  });
});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
