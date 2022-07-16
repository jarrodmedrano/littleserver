const express = require("express");
const app = express();
const low = require("lowdb");
const fs = require("lowdb/adapters/FileSync");
const adapter = new fs("db.json");
const db = low(adapter);
const cors = require("cors");

// allow cross-origin resource sharing (CORS)
app.use(cors());

// data parser - used to parse post data
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// serve static files from public directory
// -------------------------------------------
app.use(express.static("public"));

// init the data store
db.defaults({ users: [], accounts: [] }).write();

// return all users & accounts
app.get("/data", function (req, res) {
  res.send(db.get("users").value());
  res.send(db.get("accounts").value());
});

// return all users
app.get("/accounts", function (req, res) {
  res.send(db.get("accounts").value());
});

// add user
app.post("/add", function (req, res) {
  var user = {
    name: req.body.name,
    dob: req.body.dob,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    phone: req.body.phone,
    streetaddress: req.body.streetaddress,
    citystatezip: req.body.citystatezip,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    avatar: req.body.avatar,
  };
  db.get("users").push(user).write();
  console.log(db.get("users").value());
  res.send(db.get("users").value());
});

// add user
app.post("/accounts", function (req, res) {
  var user = {
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  };
  db.get("accounts").push(user).write();
  console.log(db.get("accounts").value());
  res.send(db.get("accounts").value());
});

// start server
// -----------------------
app.listen(9001, function () {
  console.log("Running on port 9001!");
});
