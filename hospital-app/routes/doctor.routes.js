const express = require("express");
const router = express.Router();
const controller = require("../controllers/doctor.controller");

router.post("/", controller.createDoctor);
router.delete("/:id", controller.softDeleteDoctor);
router.get("/:id/patients", controller.getDoctorPatients);
router.get("/:id/consultations/count", controller.getDoctorConsultationCount);

module.exports = router;