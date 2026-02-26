const emitter = require("../events/notificationEmitter");

function loginUser(username) {
  setTimeout(() => {
    console.log(`> User ${username} logged in`);
    emitter.emit("userLoggedIn", username);
  }, 1000);
}

function receiveMessage(username, message) {
  setTimeout(() => {
    console.log(`> Message received for ${username}: "${message}"`);
    emitter.emit("messageReceived", { username, message });
  }, 2000);
}

module.exports = { loginUser, receiveMessage };