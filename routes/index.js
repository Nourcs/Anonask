var express = require("express");
var router = express.Router();

var firebase = require("firebase");

var loginRoute = require("./auth/login");
var signupRoute = require("./auth/signup");
var logoutRoute = require("./auth/logout");

router.get("/", function(req, res, next) {
  res.render("index");
});

router.get("/current", (req, res, next) => {
  res.json({ signedCookies: req.signedCookies, cookies: req.cookies });
});
router.use("/login", loginRoute);
router.use("/signup", signupRoute);
router.use("/logout", logoutRoute);

module.exports = router;
