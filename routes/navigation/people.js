var express = require("express");
var router = express.Router();
var cookieParser = require("cookie-parser");

var User = require("../../models/user");

var mongoose = require("mongoose");

// Old User Log In
router.get("/people", (req, res, next) => {
  res.render("navigation/people");
});

router.post("/people/search", (req, res, next) => {
  let name = req.body.name;
  console.log(name);
  User.find({ fullName: new RegExp(name, "gi") })
  .then(result => {
    res.json(result);
  });
  // res.send("asba");
});

module.exports = router;
