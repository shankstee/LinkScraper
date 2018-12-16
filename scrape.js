var express = require("express");
var axios = require("axios");
var cheerio = require("cheerio");
var PORT = 3000;

// Initialize Express
var app = express();

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: true })

axios.get("https://www.reddit.com/r/nbastreams").then(function(response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(response.data);

    // Now, we grab every span and do the following:
    $(".y8HYJ-y_lTUHkQIc1mdCq").each(function(i, element) {
      // Save an empty result object

      // Empty object to store each game thread from the nba Streams page 
      var result = {};
      if ($(this).text().includes("Game Thread")) {
        result.streamLink = "https://www.reddit.com" + $(this).children("a").attr("href")
      }
      console.log(result);
    });
  });

  // Now that I have the links to each game thread page, redirect to the link and grab all p tags with <a href>
  // and store those links to the html page.
  // Also grab a title for each game that the links are attached to. 


    // Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });
