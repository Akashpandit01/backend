const express = require("express");
const router = express.Router();
const controller = require("../controllers/patient.controller");

router.post("/", controller.createPatient);
router.delete("/:id", controller.softDeletePatient);
router.get("/:id/doctors", controller.getPatientDoctors);
router.get("/", controller.getMalePatients); // ?gender=Male

module.exports = router;