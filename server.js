var express = require("express");
var axios = require("axios");
var cheerio = require("cheerio");
var PORT = 3000;


// Initialize Express
var app = express();


    // Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });
