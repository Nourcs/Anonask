var express = require("express");
var router = express.Router();
var cookieParser = require("cookie-parser");

var User = require("../../models/user");

var mongoose = require("mongoose");

// Old User Log In
router.get("/", (req, res, next) => {
  res.json({ status: "Profile" });
});

module.exports = router;
