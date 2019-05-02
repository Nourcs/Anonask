var express = require("express");
var router = express.Router();

var firebase = require("firebase");

var loginRoute = require("./auth/login");
var signupRoute = require("./auth/signup");
var logoutRoute = require("./auth/logout");

router.get("/", function(req, res, next) {
  console.log("User : ", firebase.auth().currentUser);
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      res.json({ user });
    } else {
      res.render("index");
    }
  });
});

router.use("/login", loginRoute);
router.use("/signup", signupRoute);
router.use("/logout", logoutRoute);

module.exports = router;
