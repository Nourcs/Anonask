var express = require("express");
var router = express.Router();
var cookieParser = require("cookie-parser");

var User = require("../../models/user");

var mongoose = require("mongoose");

// Old User Log In
router.get("/", (req, res, next) => {
  let currentUser = req.cookies.currentUser[0];
  console.log(currentUser);
  res.render("navigation/profile", { currentUser });
});

module.exports = router;
