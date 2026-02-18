const Enrollment = require("../models/Enrollment.model");
const Student = require("../models/Student.model");
const Course = require("../models/Course.model");

exports.enrollStudent = async (req, res) => {
  try {
    const { studentId, courseId } = req.body;

    const student = await Student.findById(studentId);
    const course = await Course.findById(courseId);

    if (!student || !student.isActive)
      return res.status(400).json({ message: "Student inactive or not found" });

    if (!course || !course.isActive)
      return res.status(400).json({ message: "Course inactive or not found" });

    const enrollment = await Enrollment.create({ studentId, courseId });

    res.status(201).json(enrollment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};