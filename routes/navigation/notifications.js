var express = require("express");
var router = express.Router();
var cookieParser = require("cookie-parser");

var User = require("../../models/user");

var mongoose = require("mongoose");

// Old User Log In
router.get("/notifications", (req, res, next) => {
  res.render("navigation/notifications");
});

module.exports = router;
