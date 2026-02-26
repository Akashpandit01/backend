const emitter = require("./events/notificationEmitter");
const { loginUser, receiveMessage } = require("./services/userService");
const { syncUserData } = require("./services/syncService");

// Listener 1: Logging
emitter.on("userLoggedIn", (username) => {
  console.log(`> [LOG] ${username} logged in successfully`);
});

// Listener 2: Notification
emitter.on("userLoggedIn", (username) => {
  console.log(`> Notification sent to ${username}`);
  syncUserData(username);
});

emitter.on("messageReceived", ({ username, message }) => {
  console.log(`> [LOG] Message for ${username}: ${message}`);
});

emitter.on("dataSynced", (username) => {
  console.log(`> Data sync complete for ${username}`);
});

// Simulate App Flow
function startApp() {
  console.log("🚀 Real-Time Notification System Started...\n");

  loginUser("John");

  setTimeout(() => {
    receiveMessage("John", "Welcome to our platform!");
  }, 3000);
}

startApp();