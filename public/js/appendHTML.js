var axios = require("axios");
var cheerio = require("cheerio");

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

var links = [];

  app.get("/", function(req, res) {
    axios.get("https://www.reddit.com/r/nbastreams").then(function(response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(response.data);

    // Now, we grab every span and do the following:
    $(".y8HYJ-y_lTUHkQIc1mdCq").each(function(i, element) {

    if ($(this).text().includes("Game Thread")) {
      links.push({
        title: $(this).text(),
        link: "https://www.reddit.com" + $(this).children("a").attr("href")
      });
    }
     
    //  console.log("https://www.reddit.com" + $(this).children("a").attr("href"));
    });
    
    $("#link").append(`<td>${links[0].title}</td>`)

    console.log(links)

    
  });
    res.render("table");
});
