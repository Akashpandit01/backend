require("dotenv").config();
const app = require("./app");
require("./crons/bulkInsert.cron");
require("./crons/report.cron");

app.listen(process.env.PORT, () => {
  console.log("🚀 Server running on port", process.env.PORT);
});