module.exports = {
  currentUser: function(req, res, next) {
    let currentUser = null;
    if (req.cookies) {
      currentUser = req.cookies.currentUser;
    }
    if (currentUser) {
      res.render("error", { message: "You are already Logged in" });
    } else {
      next();
    }
  },
  noCurrentUser: function(req, res, next) {
    let currentUser = null;
    if (req.cookies) {
      currentUser = req.cookies.currentUser;
    }
    if (currentUser) {
      next();
    } else {
      res.render("error", { message: "Please Log in" });
    }
  }
};
