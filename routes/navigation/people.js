var express = require("express");
var router = express.Router();
var cookieParser = require("cookie-parser");

var User = require("../../models/user");
var Question = require("../../models/questions");
var Post = require("../../models/posts");
var mongoose = require("mongoose");

// Old User Log In
router.get("/account/people", (req, res, next) => {
  res.render("navigation/people");
});

router.post("/account/people/search", (req, res, next) => {
  let name = req.body.name;
  console.log(name);
  User.find({ fullName: new RegExp(name, "gi") }).then(result => {
    res.json(result);
  });
  // res.send("asba");
});

router.get("/account/people/:id", (req, res, next) => {
  if (req.cookies.currentUser._id === req.params.id) {
    res.redirect("/profile");
  }
  User.findById(req.params.id).then(user => {
    Post.find({ to: req.params.id })
      .sort({ createdAt: -1 })
      .then(posts => {
        res.render("navigation/peopleProfile", { user, posts });
      });
  });
});

router.post("/account/people/:id/newQuestion", (req, res, next) => {
  User.findById(req.params.id).then(user => {
    let from = req.cookies.currentUser;
    let to = user;
    let question = req.body.question;
    Question.create({ from, to, question }).then(question => {});
    res.redirect("/");
  });
});

module.exports = router;
