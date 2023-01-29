const express = require("express");

const router = express.Router();

const { validation, authenticate, isValidId, upload } = require("../middleware/");
const { asyncWrapper } = require("../helpers");

// router.get("/", asyncWrapper(ctrl.getUser)); //TODO: router.get("/", authenticate, asyncWrapper(ctrl.getUser));

module.exports = router;
