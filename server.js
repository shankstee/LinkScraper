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

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/comics", { useNewUrlParser: true });

var PORT = process.env.PORT || 3000;

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


app.get("/", function(req, res) {

  var hbsObj = {};
  db.Comic.find({})
    .then(function(dbComics) {
      // If we were able to successfully find Comic Threads, send them back to the client
      hbsObj.post = dbComics;
      console.log(hbsObj)
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });

    db.Show.find({})
    .then(function(dbShows) {
      // If we were able to successfully find Comic Threads, send them back to the client
      hbsObj.showPost = dbShows;
      console.log(hbsObj)
      res.render("table", hbsObj);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});
  

// A GET route for scraping the /r/theWalkingDead reddit website
app.get("/scrapeComics", function(req, res) {
  // First, we grab the body of the html with axios
  axios.get("https://old.reddit.com/r/thewalkingdead/").then(function(response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(response.data);
    // Grab each span tag on the page
    
    $("span").each(function (i, element) {
      var comicTableInfo = {};
      var showTableInfo = {};
      // for each span on the page, if the text within that span tag is === to Comic Spiolers, push that to the comic table, else if the text is ==
      // to Show spoiler, push to show table.
        if ($(this).text().includes("Comic Spoiler")) {  
          comicTableInfo.thread = $(this).text()
          comicTableInfo.title = $(this).next().text()
          comicTableInfo.link = "https://www.reddit.com" + $(this).next().attr("href")
        db.Comic.remove({}, ()=> {
          console.log("Removed Data");
        })
        db.Comic.create(comicTableInfo)
          .then(function(dbComicThread) {
          // View the added result in the console
          console.log(dbComicThread);
        })
        .catch(function(err) {
          // If an error occurred, log it
          console.log(err);
        });
        } else if ($(this).text() === "Show Spoiler") {
          showTableInfo.thread = $(this).text()
          showTableInfo.title = $(this).next().text()
          showTableInfo.link = "https://www.reddit.com" + $(this).next().attr("href")
        db.Show.remove({}, ()=> {
          console.log("Removed Data");
        })
        db.Show.create(showTableInfo)
          .then(function(dbShowThread) {
          // View the added result in the console
          console.log(dbShowThread);
        })
        .catch(function(err) {
          // If an error occurred, log it
          console.log(err);
        });
        }

    // End of for each "<span> tag"
    });
    res.send("Information  scraped and organized")
  });
});

// Route for getting all Comic Threads from the  Comics db
app.get("/Comics", function(req, res) {
  // Grab every document in the Articles collection
  db.Comic.find({})
    .then(function(dbComics) {
      // If we were able to successfully find Comic Threads, send them back to the client
      res.json(dbComics);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});
    // Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });
