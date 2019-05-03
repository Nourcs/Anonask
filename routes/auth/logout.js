var express = require("express");
var router = express.Router();

var firebase = require("firebase");

// Logout Route
router.post("/", (req, res, next) => {
  res.clearCookie("currentUser");
  res.redirect("/");
});

module.exports = router;
