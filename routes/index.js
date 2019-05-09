var express = require("express");
var router = express.Router();
var Question = require("../models/questions");
var hbs = require("hbs");
var User = require("../models/user");
// var User = require("../models/user");
var loginRoute = require("./auth/login");
var signupRoute = require("./auth/signup");
var logoutRoute = require("./auth/logout");
var profileRoute = require("./navigation/profile");
var inboxRoute = require("./navigation/inbox");
var notificationsRoute = require("./navigation/notifications");
var peopleRoute = require("./navigation/people");
var authMiddleware = require("./authMiddleware");

router.get("/", authMiddleware.homePage, function(req, res, next) {
  res.render("index");
});

router.post("/showPeople", (req, res, next) => {
  let users = [];
  User.count().exec(function(err, count) {
    for (let i = 0; i < 10; i++) {
      var random = Math.floor(Math.random() * count);
      User.findOne()
        .skip(random)
        .exec(function(err, result) {
          users.push(result);
          // if (users.indexOf(result) >= 0) {
          //   users.splice(users.indexOf(result), 1);
          //   i--;
          // }
          if (users.length === 10) {
            res.json(users);
          }
        });
    }
  });
});

router.post("/notifications", (req, res, next) => {
  let currentUser = req.cookies.currentUser;
  Question.find({ to: currentUser, seen: false }).then(questions => {
    let total = questions.length;
    res.json({ total });
  });
});

router.get("/current", (req, res, next) => {
  res.json({ signedCookies: req.signedCookies, cookies: req.cookies });
});

router.use("/login", loginRoute);
router.use("/signup", signupRoute);
router.use("/logout", logoutRoute);
router.use("/profile", authMiddleware.noCurrentUser, profileRoute);
router.use("/account", authMiddleware.noCurrentUser, inboxRoute);
router.use("/account", authMiddleware.noCurrentUser, notificationsRoute);
router.use("/", authMiddleware.noCurrentUser, peopleRoute);

module.exports = router;
