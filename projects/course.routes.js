const express = require("express");
const router = express.Router();
const controller = require("../controllers/course.controller");

router.post("/", controller.createCourse);
router.delete("/:id", controller.softDeleteCourse);
router.get("/:id/students", controller.getCourseStudents);

module.exports = router;