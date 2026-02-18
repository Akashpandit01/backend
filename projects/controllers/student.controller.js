const Student = require("../models/Student.model");
const Enrollment = require("../models/Enrollment.model");

exports.createStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.softDeleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    await Enrollment.updateMany(
      { studentId: req.params.id },
      { isActive: false }
    );

    res.json({ message: "Student soft deleted & enrollments deactivated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getStudentCourses = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({
      studentId: req.params.id,
      isActive: true
    }).populate("courseId");

    res.json(enrollments.map(e => e.courseId));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};