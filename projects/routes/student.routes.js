const express = require("express");
const router = express.Router();
const controller = require("../controllers/student.controller");

router.post("/", controller.createStudent);
router.delete("/:id", controller.softDeleteStudent);
router.get("/:id/courses", controller.getStudentCourses);

module.exports = router;