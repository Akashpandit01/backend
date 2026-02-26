const mongoose = require("mongoose");

const chatMessageSchema = new mongoose.Schema({
  room: String,
  user: String,
  text: String,
  time: String
}, { timestamps: true });

module.exports = mongoose.model("ChatMessage", chatMessageSchema);