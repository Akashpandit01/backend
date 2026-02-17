const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/book_rental_system")
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.log("❌ DB Error:", err));

const rentalRoutes = require("./routes/rental.routes");
app.use("/api", rentalRoutes);

app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});