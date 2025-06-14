const express = require("express");
const passport = require("passport");
const {
  register,
  login,
  generateTokenForGoogleUser,
} = require("../controllers/authController");
const loginRateLimiter = require("../middleware/loginRateLimit");

const router = express.Router();

router.post("/register", register);
router.post("/login", loginRateLimiter, login);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),
  (req, res) => {
    const token = generateTokenForGoogleUser(req.user);
    res.redirect(`http://localhost:4000/?token=${token}`);
  }
);

module.exports = router; 