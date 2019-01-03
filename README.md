# The Walking Dead Data Scraping
This is a full-stack application that scrapes data from a web page and organizes it based on the data type.

# About
The purpose of this application is to learn and practice the process of gathering data through web scraping in addition to utilizing said data with MongoDB and Mongoose. This application scrapes all Comic and Show spoiler threads from /r/thewalkingdead sub reddit page and displays the links to this post on two separate tables to help avoid show or comic spoilers if a user has yet to read or watch the most recent comic book or AMC episode. 

# Deployment
The application is deployed to Heroku: https://afternoon-cove-83150.herokuapp.com/

There may be a small delay when you first try to access the application due to the web dyno going to sleep if it receives no traffic for 30 minutes.

# How to

The user will start of on the homepage showing two tables one above the other. The top table is all Comic book spoiler threads last saved to the database and below is a table holding all Show spoiler threads last saved to the database. At the top of the page there is a "Grab Fresh Threads" button that will re-scrape the /r/thewalkingdead web page and save that data to the database and redirect the user to a conformation page stating that the new data was scrapped successfully. Under conformation text is a button that will redirect the user back to the homepage with all up to date information shown on either table.

# Technologies Used
Bootstrap and Handlebars.js
MongoDB and Mongoose
Node.js and Express.js
Axios and Cheerio
Heroku


