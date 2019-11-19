//packages
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./models/index.js");
const routes = require("./routes");
const passport = require("./config/passport");
const session = require("express-session");

//starting express app
const app = express();

//setting up view engine
app.set("view engine", "ejs");

//middleware
app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  session({ secret: "Cohort orlando", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// routing manager
app.use(routes);

db.sequelize.sync().then(function() {
  //server listening for request
  app.listen(3000, function(err) {
    if (err) console.log(err);
    console.log("sever is liT!!!!!");
  });
});
