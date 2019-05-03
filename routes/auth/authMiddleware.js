module.exports = {
  isLoggedIn: function(req, res, next) {
    let currentUser = null;
    if (req.cookies) {
      currentUser = req.cookies.currentUser;
    }
    if (currentUser) {
      res.render("error", { message: "You are already Logged in" });
    } else {
      next();
    }
  }
};
