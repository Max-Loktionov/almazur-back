const express = require("express");

const router = express.Router();

const { validation, authenticate } = require("../middleware/");

const { asyncWrapper } = require("../helpers");

const { schemasUser } = require("../models/user");
const { authCTRL: ctrl } = require("../controllers");

router.post("/signup", validation(schemasUser.registerJoiSchema), asyncWrapper(ctrl.signup));
// router.get("/current", authenticate, asyncWrapper(ctrl.getCurrent));

// router.post("/login", validation(schemasUser.loginJoiSchema), asyncWrapper(ctrl.login));
// router.get("/logout", authenticate, asyncWrapper(ctrl.logout));

module.exports = router;
