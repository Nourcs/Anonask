var express = require("express");
var router = express.Router();

var firebase = require("firebase");

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/", (req, res, next) => {
  let { email, password } = req.body;
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch(error => {
      console.error(error);
    });
  res.json(req.body);
});
module.exports = router;
