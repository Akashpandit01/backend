// models/Dish.model.js
const mongoose = require("mongoose");

const dishSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  isAvailable: { type: Boolean, default: true },
});

module.exports = mongoose.model("Dish", dishSchema);