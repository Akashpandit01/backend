// models/Session.model.js
const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  topic: String,
  scheduledAt: Date,

  mentors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Mentor" }],
  learners: [{
    learnerId: { type: mongoose.Schema.Types.ObjectId, ref: "Learner" },
    attendanceStatus: { type: String, enum: ["booked", "attended", "cancelled"], default: "booked" },
    feedback: String
  }],

  notes: String,
  isActive: { type: Boolean, default: true },
  isArchived: { type: Boolean, default: false }
});

module.exports = mongoose.model("Session", sessionSchema);