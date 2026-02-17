const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3
  },
  author: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["available", "borrowed"],
    default: "available",
    required: true
  },
  borrowers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member"
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

/**
 * 🔒 Pre Hook (Validation before save)
 * Ensure status matches borrowers list
 */
bookSchema.pre("save", function (next) {
  if (this.borrowers.length > 0) {
    this.status = "borrowed";
  } else {
    this.status = "available";
  }
  next();
});

module.exports = mongoose.model("Book", bookSchema);