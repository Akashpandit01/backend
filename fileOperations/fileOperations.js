const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "data.txt");

function readFileData() {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    console.log(data);
  } catch (error) {
    console.error("❌ Error reading file:", error.message);
  }
}

function appendFileData() {
  try {
    fs.appendFileSync(filePath, "\nThis is Appended data");
    console.log("Appending data...\n");
  } catch (error) {
    console.error("❌ Error appending file:", error.message);
  }
}

module.exports = { readFileData, appendFileData };