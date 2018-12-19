var express = require("express");

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


    // Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });
