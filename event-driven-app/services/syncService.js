const emitter = require("../events/notificationEmitter");

function syncUserData(username) {
  console.log("> Syncing user data...");
  setTimeout(() => {
    emitter.emit("dataSynced", username);
  }, 1500);
}

module.exports = { syncUserData };