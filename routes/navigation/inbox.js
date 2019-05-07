var express = require("express");
var router = express.Router();
var cookieParser = require("cookie-parser");

var Question = require("../../models/questions");

var mongoose = require("mongoose");

// Old User Log In
router.get("/inbox", (req, res, next) => {
  Question.find({ to: req.cookies.currentUser, answered: false })
    .sort({ createdAt: -1 })
    .then(questions => {
      // res.json(questions);
      res.render("navigation/inbox", { questions });
    });
});

router.post("/inbox/delete", (req, res, next) => {
  Question.findByIdAndRemove(req.body.questionId).then(result => {
    res.redirect("/account/inbox");
  });
});

router.post("/inbox/deleteAll", (req, res, next) => {
  Question.find({ to: req.cookies.currentUser._id, answered: false }).then(
    questions => {
      if (questions) {
        for (let i = 0; i < questions.length; i++) {
          Question.findByIdAndDelete(questions[i]._id).then(response => {
            console.log(response);
            if (i === questions.length - 1) {
              res.redirect("./");
            }
          });
        }
      }
    }
  );
});
module.exports = router;
