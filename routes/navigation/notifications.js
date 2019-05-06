var express = require("express");
var router = express.Router();
var cookieParser = require("cookie-parser");

var User = require("../../models/user");
var Question = require("../../models/questions");

var mongoose = require("mongoose");

// Old User Log In
router.get("/notifications", (req, res, next) => {
  let currentUser = req.cookies.currentUser;
  Question.find({ to: currentUser })
    .sort({ createdAt: -1 })
    .then(questions => {
      res.render("navigation/notifications", { questions });
    });
});

router.post("/notifications", (req, res, next) => {
  let currentUser = req.cookies.currentUser;
  Question.find({ to: currentUser, seen: false }).then(questions => {
    for (let i = 0; i < questions.length; i++) {
      Question.findByIdAndUpdate(questions[i]._id, { seen: true }).then(
        response => {
          res.redirect("/account/notifications");
        }
      );
    }
  });
});

module.exports = router;
