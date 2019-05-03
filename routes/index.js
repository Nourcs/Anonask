var express = require("express");
var router = express.Router();

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
  // res.json({ currentUser });
  res.render("index", { currentUser });
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
router.use("/account", authMiddleware.noCurrentUser, peopleRoute);

module.exports = router;
