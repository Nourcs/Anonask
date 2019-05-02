var express = require("express");
var router = express.Router();

var firebase = require("firebase");

router.get("/", (req, res, next) => {
  res.render("auth/login");
});

module.exports = router;
