var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

var PORT = 3000;

// Initialize Express
var app = express();

var exphbs  = require('express-handlebars');

// Handlebars
app.engine(
  "handlebars",
  exphbs({
      defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// A GET route for scraping the /r/theWalkingDead reddit website
app.get("/", function(req, res) {
  // First, we grab the body of the html with axios
  axios.get("https://old.reddit.com/r/thewalkingdead/").then(function(response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(response.data);
    // Grab each span tag on the page
    
    $("span").each(function (i, element) {
      var comicTableInfo = {};
      // for each span on the page, if the text within that span tag is === to Comic Spiolers, push that to the comic table, else if the text is ==
      // to Show spoiler, push to show table.
        if ($(this).text().includes("Comic Spoiler")) {  
          comicTableInfo.type = $(this).text()
          comicTableInfo.title = $(this).next().text()
          comicTableInfo.link = "https://www.reddit.com" + $(this).next().attr("href")
          console.log(comicTableInfo);

        db.Comic.create(comicTableInfo)
          .then(function(dbComicThread) {
          // View the added result in the console
          console.log(dbComicThread);
        })
        .catch(function(err) {
          // If an error occurred, log it
          console.log(err);
        });
        };

    // End of for each "<span> tag"
    });
    
  });
});
    // Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });
