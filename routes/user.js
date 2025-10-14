const express = require("express");
const router = express.Router();
const passport = require("passport");



const {
  renderRegister,
  register,
  renderLogin,
  login,
  logout,
} = require("../controllers/users"); // ✅ ensure this file is exactly 'users.js'
const { saveRedirectUrl } = require("../middleware"); // ✅ ensure middleware.js exports this




// ===================
// SIGNUP ROUTES
// ===================
router
  .route("/signup")
  .get(renderRegister)
  .post(register);

// ===================
// LOGIN ROUTES
// ===================
router
  .route("/login")
  .get(renderLogin)
  .post(
    saveRedirectUrl, // ✅ middleware
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    login // ✅ callback function
  );

// ===================
// LOGOUT ROUTE
// ===================
router.get("/logout", logout);

module.exports = router;
