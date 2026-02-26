const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const { connectRedis, saveMessage, getRecentMessages } = require("./services/redis.service");
const { connectMongo } = require("./services/mongo.service");
require("./cron/backup.cron");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

let onlineUsers = [];

(async () => {
  await connectRedis();
  await connectMongo();
})();

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("register", ({ username, role }) => {
    socket.username = username;
    socket.role = role || "user"; // admin or user
    onlineUsers.push(username);

    io.emit("onlineUsers", onlineUsers);
  });

  // Join Room
  socket.on("joinRoom", async (room) => {
    socket.join(room);
    socket.room = room;

    const history = await getRecentMessages(room);
    socket.emit("chatHistory", history);
  });

  // Room Message
  socket.on("roomMessage", async (msg) => {
    const messageObj = {
      user: socket.username,
      text: msg,
      time: new Date().toLocaleTimeString()
    };

    await saveMessage(socket.room, messageObj);
    io.to(socket.room).emit("newMessage", messageObj);
  });

  // Admin Announcement
  socket.on("adminMessage", (msg) => {
    if (socket.role !== "admin") {
      socket.emit("errorMsg", "❌ Only admin can send announcements");
      return;
    }

    io.emit("adminAnnouncement", {
      admin: socket.username,
      text: msg,
      time: new Date().toLocaleTimeString()
    });
  });

  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter(u => u !== socket.username);
    io.emit("onlineUsers", onlineUsers);
    console.log("Disconnected:", socket.username);
  });
});

server.listen(3000, () => {
  console.log("🚀 Server running at http://localhost:3000");
});