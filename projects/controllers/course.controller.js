const Course = require("../models/Course.model");
const Enrollment = require("../models/Enrollment.model");

exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.softDeleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    await Enrollment.updateMany(
      { courseId: req.params.id },
      { isActive: false }
    );

    res.json({ message: "Course soft deleted & enrollments deactivated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCourseStudents = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({
      courseId: req.params.id,
      isActive: true
    }).populate("studentId");

    res.json(enrollments.map(e => e.studentId));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};