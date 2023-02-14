const express = require("express");

const router = express.Router();

const { validation, authenticate } = require("../middleware/");

const { asyncWrapper } = require("../helpers");

const { partnersSchema } = require("../models/partners");
const { partnersCTRL: ctrl } = require("../controllers");

router.get("/", asyncWrapper(ctrl.getAllPartnersCTRL));
router.get("/:id", asyncWrapper(ctrl.getPartnerByIdCTRL));
router.post("/", authenticate, validation(partnersSchema), asyncWrapper(ctrl.addPartnersCTRL));
router.patch("/:id/:properties", authenticate, asyncWrapper(ctrl.updatePartnerCTRL));
router.patch("/logo/:id", authenticate, asyncWrapper(ctrl.updateLogoPartnerCTRL));
router.delete("/:id", authenticate, asyncWrapper(ctrl.deletePartnerCTRL));

module.exports = router;
