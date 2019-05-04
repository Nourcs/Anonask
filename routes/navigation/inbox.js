var express = require("express");
var router = express.Router();
var cookieParser = require("cookie-parser");

var Question = require("../../models/questions");

var mongoose = require("mongoose");

// Old User Log In
router.get("/inbox", (req, res, next) => {
  Question.find({ to: req.cookies.currentUser, answered: false }).then(
    questions => {
      // res.json(questions);
      res.render("navigation/inbox", { questions });
    }
  );
});

module.exports = router;
