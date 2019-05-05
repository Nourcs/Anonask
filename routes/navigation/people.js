var express = require("express");
var router = express.Router();
var cookieParser = require("cookie-parser");

var User = require("../../models/user");
var Question = require("../../models/questions");
var mongoose = require("mongoose");

// Old User Log In
router.get("/people", (req, res, next) => {
  res.render("navigation/people");
});

router.post("/people/search", (req, res, next) => {
  let name = req.body.name;
  console.log(name);
  User.find({ fullName: new RegExp(name, "gi") }).then(result => {
    res.json(result);
  });
  // res.send("asba");
});

router.get("/people/:id", (req, res, next) => {
  User.findById(req.params.id).then(user => {
    res.render("navigation/peopleProfile", { user });
  });
});

router.post("/people/:id/newQuestion", (req, res, next) => {
  User.findById(req.params.id).then(user => {
    let from = req.cookies.currentUser;
    let to = user;
    let question = req.body.question;
    Question.create({ from, to, question }).then(question => {
      console.log(user);
    });
    res.redirect("/");
  });
});

module.exports = router;
