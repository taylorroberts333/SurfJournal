//root folder
//express for building REST API's
const express = require("express");
const bodyParser = require("body-parser");
//express middleware
const cors = require("cors");

//create express app
const app = express();

//set origin
var corsOptions = {
   origin: "http://localhost:8081",
};

//add middlewares to app
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");

//sync database
db.sequelize
   .sync()
   .then(() => {
      console.log("Synced db.");
   })
   .catch((err) => {
      console.log("Failed to sync db: " + err.message);
   });

//check route
app.get("/", (req, res) => {
   res.json({ message: "Welcome to The Surf Journal." });
});

//get routes for navigating request
require("./app/routes/journal.routes")(app);

//Get port and listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}.`);
});

//const mostCommon = await sequelize.query("select size, count(size) c from journals group by size order by c desc limit 1", { type: QueryTypes.SELECT });
//console.log(mostCommon);
