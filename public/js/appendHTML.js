var exphbs  = require('express-handlebars');

// Handlebars
app.engine(
  "handlebars",
  exphbs({
      defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: true })

var links = [];



  // Now that I have the links to each game thread page, redirect to the link and grab all p tags with <a href>
  // and store those links to the html page.
  // Also grab a title for each game that the links are attached to. 

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
