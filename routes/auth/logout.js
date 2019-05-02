var express = require("express");
var router = express.Router();

var firebase = require("firebase");

router.get("/", (req, res, next) => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      res.redirect("/");
    })
    .catch(error => {
      console.error(error);
    });
});

module.exports = router;
