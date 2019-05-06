var express = require("express");
var router = express.Router();
var Question = require("../models/questions");

var loginRoute = require("./auth/login");
var signupRoute = require("./auth/signup");
var logoutRoute = require("./auth/logout");
var profileRoute = require("./navigation/profile");
var inboxRoute = require("./navigation/inbox");
var notificationsRoute = require("./navigation/notifications");
var peopleRoute = require("./navigation/people");
var authMiddleware = require("./authMiddleware");

router.get("/", function(req, res, next) {
  let currentUser = null;
  if (req.cookies) {
    currentUser = req.cookies.currentUser;
  }
  res.render("index", { currentUser });

  // res.json({ currentUser });
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
