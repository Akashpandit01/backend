const express = require("express");
const bulkRoutes = require("./routes/bulk.routes");

const app = express();
app.use(express.json());

app.use("/bulk", bulkRoutes);

module.exports = app;