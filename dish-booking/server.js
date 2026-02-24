const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
});

app.set("io", io);

server.listen(process.env.PORT, () => {
  console.log("Server running with Socket.io");
});