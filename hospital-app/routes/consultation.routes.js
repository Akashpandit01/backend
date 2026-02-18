const express = require("express");
const router = express.Router();
const controller = require("../controllers/consultation.controller");

router.post("/", controller.createConsultation);
router.get("/recent", controller.getRecentConsultations);

module.exports = router;