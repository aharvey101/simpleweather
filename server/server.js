var express = require("express");
var cors = require("cors");
var app = express();
const axios = require("axios");
const path = require("path");


function requireHTTPS(req, res, next) {
  // The 'x-forwarded-proto' check is for Heroku
  if (!req.secure && req.get('x-forwarded-proto') !== 'https' && process.env.NODE_ENV !== "development") {
    return res.redirect('https://' + req.get('host') + req.url);
  }
  next();
}


app.use(cors());

app.get("/api/location/search/:location", async (req, res) => {
  let response;
  try {
    response = await axios.get(
      `https://www.metaweather.com/api/location/search/?query=${req.params.location}`
    );
  } catch (e) {
    res.status(404).send();
  }  
  res.status(200).send(response.data);

});

app.get("/api/location/:woed", async (req, res) => {
  let response;

  try {
    response = await axios.get(
      `https://www.metaweather.com/api/location/${req.params.woed}`
    );
  } catch (e) {
    res.status(404).send();
  }
    res.status(200).send(response.data);

});

if (process.env.NODE_ENV === "production") {
  app.use(requireHTTPS); // redirect http requests to https.
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req, res) => {
    // Could have used absolute imports here.
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 8000;
app.listen(PORT, function() {
  console.log(`Server listening on port ${PORT}`);
});
