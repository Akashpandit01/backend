const { readFileData, appendFileData } = require("./fileOperations");

console.log("Initial File Content:");
readFileData();

console.log("\nAppending data...\n");
appendFileData();

console.log("Updated File Content:");
readFileData();