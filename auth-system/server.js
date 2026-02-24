require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.routes");

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);

connectDB();

app.listen(process.env.PORT, () => {
  console.log("Server running on port", process.env.PORT);
});