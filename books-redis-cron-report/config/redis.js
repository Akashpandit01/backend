const { createClient } = require("redis");

const redis = createClient({ url: process.env.REDIS_URL });

redis.connect()
  .then(() => console.log("✅ Redis Connected"))
  .catch(console.error);

module.exports = redis;