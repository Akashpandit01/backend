const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/one_to_one_demo")
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.log("❌ DB Error:", err));

const routes = require("./routes/userProfile.routes");
app.use("/api", routes);

app.listen(3000, () => {
  console.log("🚀 Server running on port 3000");
});