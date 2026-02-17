const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  bio: {
    type: String
  },
  socialMediaLinks: {
    type: [String]
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true   // 🔥 ensures one-to-one (one profile per user)
  }
}, { timestamps: true });

module.exports = mongoose.model("Profile", profileSchema);