const express = require("express");

const router = express.Router();

const { validation, authenticate } = require("../middleware/");

const { asyncWrapper } = require("../helpers");

const { schemasUser } = require("../models/user");
const { authCTRL: ctrl } = require("../controllers");

router.post("/signup", validation(schemasUser.registerJoiSchema), asyncWrapper(ctrl.signupCTRL));
router.get("/checking/:checkingToken", asyncWrapper(ctrl.checkingEmailCTRL));
router.get("/verify/:verificationToken", asyncWrapper(ctrl.resendVerifyEmailCTRL));
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

router.get("login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      error: false,
      message: "Successfully Loged In",
      user: req.user,
    });
  } else {
    res.status(403).json({ error: true, message: "Not Autorized" });
  }
});
router.get("/login/failed", (req, res) => {
  res.status(401).json({ error: true, message: "Log in failure" });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_URL);
});
// router.get("/current", authenticate, asyncWrapper(ctrl.getCurrent));

// router.post("/login", validation(schemasUser.loginJoiSchema), asyncWrapper(ctrl.login));
// router.get("/logout", authenticate, asyncWrapper(ctrl.logout));

module.exports = router;
