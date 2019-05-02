var express = require("express");
var router = express.Router();

var firebase = require("firebase");
var facebookProvider = new firebase.auth.FacebookAuthProvider();
var googleProvider = new firebase.auth.GoogleAuthProvider();

router.get("/", (req, res, next) => {
  res.render("auth/login");
});

router.post("/", (req, res, next) => {
  let { email, password } = req.body;
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch(error => {
      console.error(error);
    });
  res.json(req.body);
});

router.post("/facebook", (req, res, next) => {
  firebase
    .auth()
    .signInWithPopup(facebookProvider)
    .then(result => {
      res.json(result);
    })
    .catch(error => {
      console.error(error);
    });
});

router.post("/google", (req, res, next) => {
  firebase
    .auth()
    .signInWithPopup(googleProvider)
    .then(result => {
      res.json(result);
    })
    .catch(error => {
      console.error(error);
    });
});
module.exports = router;
