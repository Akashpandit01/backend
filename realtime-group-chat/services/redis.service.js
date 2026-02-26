const { createClient } = require("redis");

const redisClient = createClient({ url: "redis://127.0.0.1:6379" });

redisClient.on("error", (err) => console.error("Redis Error:", err));

async function connectRedis() {
  if (!redisClient.isOpen) {
    await redisClient.connect();
    console.log("✅ Redis connected");
  }
}

async function saveMessage(room, messageObj) {
  const key = `chat:${room}`;
  await redisClient.rPush(key, JSON.stringify(messageObj));
  await redisClient.lTrim(key, -50, -1); // keep last 50 messages
}

async function getRecentMessages(room) {
  const key = `chat:${room}`;
  const messages = await redisClient.lRange(key, 0, -1);
  return messages.map(m => JSON.parse(m));
}

module.exports = { connectRedis, saveMessage, getRecentMessages, redisClient };