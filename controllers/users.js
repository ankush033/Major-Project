const User = require("../models/user");

// Render signup form
const renderRegister = (req, res) => {
  return res.render("users/signup");
};

// Handle signup
const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email });
    const registeredUser = await User.register(user, password);

    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Welcome to Wanderlust!");
      return res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    return res.redirect("/signup");
  }
};

// Render login form
const renderLogin = (req, res) => {
  return res.render("users/login");
};

// Handle login
const login = (req, res) => {
  req.flash("success", "Welcome back!");
  const redirectUrl = res.locals.redirectUrl || "/listings";
  return res.redirect(redirectUrl);
};

// Logout
const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.flash("success", "Goodbye!");
    return res.redirect("/listings");
  });
};

module.exports = {
  renderRegister,
  register,
  renderLogin,
  login,
  logout,
};
