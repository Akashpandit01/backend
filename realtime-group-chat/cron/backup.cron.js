const cron = require("node-cron");
const { redisClient } = require("../services/redis.service");
const ChatMessage = require("../models/ChatMessage.model");

cron.schedule("*/5 * * * *", async () => {
  console.log("⏳ Running Redis → MongoDB backup job...");

  const keys = await redisClient.keys("chat:*");

  for (let key of keys) {
    const room = key.split(":")[1];
    const messages = await redisClient.lRange(key, 0, -1);

    const docs = messages.map(m => {
      const parsed = JSON.parse(m);
      return { room, ...parsed };
    });

    if (docs.length) {
      await ChatMessage.insertMany(docs);
      await redisClient.del(key); // clear redis after backup
      console.log(`✅ Backed up room: ${room}`);
    }
  }
});