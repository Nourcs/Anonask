var express = require("express");
var router = express.Router();
var cookieParser = require("cookie-parser");

var User = require("../../models/user");

var mongoose = require("mongoose");
// Login Route
router.get("/", (req, res, next) => {
  res.render("auth/login");
});

// Sign in with Email
router.post("/email", (req, res, next) => {
  User.find({ uid: req.body.user.uid }).then(user => {
    res.cookie("currentUser", cookieParser.JSONCookies(user)).redirect("/");
  });
});

// Sign in with Google/Facebook
router.post("/provider", (req, res, next) => {
  let email = req.body.user.email;
  let fullName = req.body.user.displayName;
  let profilePicture = req.body.user.photoURL;
  let uid = req.body.user.uid;

  User.create({ uid, email, fullName, profilePicture })
    .then(user => {
      console.log(user);
      res.cookie("currentUser", cookieParser.JSONCookies(user)).redirect("/");
    })
    .catch(error => {
      console.log(error);
    });
});

module.exports = router;
