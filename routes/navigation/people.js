var express = require("express");
var router = express.Router();
var cookieParser = require("cookie-parser");

var User = require("../../models/user");
var Question = require("../../models/questions");
var Post = require("../../models/posts");
var mongoose = require("mongoose");
var Like = require("../../models/likes");
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
    res.redirect("./");
  });
});

router.post("/account/people/:id/number-of-posts", (req, res, next) => {
  Post.find({ to: req.params.id }).then(posts => {
    res.json({ npost: posts.length });
  });
});

router.post("/account/people/:id/number-of-likes", (req, res, next) => {
  Like.find({ to: req.params.id }).then(likes => {
    res.json({ nlike: likes.length });
  });
});

router.post("/account/people/:userId/:postId/like", (req, res, next) => {
  User.findById(req.params.userId).then(user => {
    Like.findOne({
      postId: req.params.postId,
      from: req.cookies.currentUser,
      to: user
    }).then(like => {
      if (like === null) {
        Post.findById(req.params.postId).then(post => {
          let from = req.cookies.currentUser;
          let to = user;
          Like.create({ from, to, postId: post }).then(like => {});
          res.json({ added: true });
        });
      } else {
        Like.findOneAndRemove({
          postId: req.params.postId,
          from: req.cookies.currentUser,
          to: user
        }).then(deleted => {
          res.json({ deleted: true });
        });
      }
    });
  });
});

router.post("/account/people/:userId/:postId", (req, res, next) => {
  User.findById(req.params.userId).then(user => {
    Like.findOne({
      from: req.cookies.currentUser,
      postId: req.params.postId,
      to: user
    }).then(like => {
      if (like) {
        res.json({ liked: true });
      } else {
        res.json({ liked: false });
      }
    });
  });
});

router.post("/account/people/:userId/:postId/total-likes", (req, res, next) => {
  Like.find({ to: req.params.userId, postId: req.params.postId }).then(
    likes => {
      res.json({ nlikes: likes.length });
    }
  );
});

module.exports = router;
