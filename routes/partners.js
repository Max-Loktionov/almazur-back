const express = require("express");

const router = express.Router();

const { validation, adminAuthenticate } = require("../middleware/");

const { asyncWrapper } = require("../helpers");

const { partnersSchema } = require("../models/partners");
const { partnersCTRL: ctrl } = require("../controllers");

router.get("/", asyncWrapper(ctrl.getAllPartnersCTRL));
router.get("/:id", asyncWrapper(ctrl.getPartnerByIdCTRL));
router.post("/", adminAuthenticate, validation(partnersSchema), asyncWrapper(ctrl.addPartnersCTRL));
router.patch("/:id/:properties", adminAuthenticate, asyncWrapper(ctrl.updatePartnerCTRL));
router.patch("/logo/:id", adminAuthenticate, asyncWrapper(ctrl.updateLogoPartnerCTRL));
router.delete("/:id", adminAuthenticate, asyncWrapper(ctrl.deletePartnerCTRL));

module.exports = router;
