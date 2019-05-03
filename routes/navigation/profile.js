var express = require("express");
var router = express.Router();
var cookieParser = require("cookie-parser");

var Question = require("../../models/questions");
var User = require("../../models/user");

var mongoose = require("mongoose");

// Old User Log In
router.get("/", (req, res, next) => {
  let currentUser = req.cookies.currentUser[0];
  console.log(currentUser);
  res.render("navigation/profile", { currentUser });
});

router.post("/new/question", (req, res, next) => {
  let from = req.cookies.currentUser;

  let to = req.cookies.currentUser;
  let question = req.body.question;

  Question.create({ from, to, question }).then(question => {
    console.log(user);
  });
  res.redirect("/");
});

router.post("/answer", (req, res, next) => {
  res.json(req.body);
});
module.exports = router;
