const express = require("express");

const authRoutes = require("./routes/authRoutes");
const todoRoutes = require("./routes/todoRoutes");

const app = express();

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/todos", todoRoutes);

module.exports = app;