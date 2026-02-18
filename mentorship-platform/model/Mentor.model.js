// models/Mentor.model.js
const mongoose = require("mongoose");

const mentorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  expertise: [String],
  isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model("Mentor", mentorSchema);