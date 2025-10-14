const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const wrapAsync = require("../utils/wrapAsync");

router.get("/signup", userController.renderRegister);
router.post("/signup", wrapAsync(userController.register));

router.get("/login", userController.renderLogin);
router.post(
  "/login",
  passport.authenticate("local", { failureFlash: true, failureRedirect: "/login" }),
  userController.login
);

router.get("/logout", userController.logout);

module.exports = router;
