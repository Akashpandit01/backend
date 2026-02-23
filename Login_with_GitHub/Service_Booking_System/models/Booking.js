const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  serviceName: { type: String, required: true },
  dateTime: { type: Date, required: true },
  status: { 
    type: String, 
    enum: ["pending", "approved", "rejected", "cancelled"], 
    default: "pending" 
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);