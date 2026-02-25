const express = require("express");
const { createClient } = require("redis");
require("dotenv").config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// -------------------
// Fake In-Memory DB
// -------------------
let items = [
  { id: 1, name: "Apple", price: 100 },
  { id: 2, name: "Banana", price: 40 }
];

// -------------------
// Redis Client Setup
// -------------------
const redisClient = createClient({
  url: process.env.REDIS_URL
});

redisClient.on("error", (err) => console.log("Redis Error:", err));

(async () => {
  await redisClient.connect();
  console.log("✅ Redis Connected");
})();

// Cache key
const CACHE_KEY = "items:all";
const CACHE_TTL = 60; // 1 minute

// -------------------
// Routes
// -------------------

// ✅ GET /items (Cache Read-Through)
app.get("/items", async (req, res) => {
  try {
    const cachedData = await redisClient.get(CACHE_KEY);

    if (cachedData) {
      console.log("⚡ Serving from Redis Cache");
      return res.json({
        source: "cache",
        data: JSON.parse(cachedData)
      });
    }

    console.log("📦 Serving from Database");
    await redisClient.setEx(CACHE_KEY, CACHE_TTL, JSON.stringify(items));

    res.json({
      source: "db",
      data: items
    });

  } catch (err) {
    res.status(500).json({ error: "Error fetching items" });
  }
});

// ✅ POST /items (Invalidate Cache)
app.post("/items", async (req, res) => {
  try {
    const newItem = {
      id: Date.now(),
      ...req.body
    };

    items.push(newItem);

    // Invalidate cache
    await redisClient.del(CACHE_KEY);

    res.status(201).json({
      message: "Item added",
      data: newItem
    });

  } catch (err) {
    res.status(500).json({ error: "Error adding item" });
  }
});

// ✅ PUT /items/:id (Invalidate Cache)
app.put("/items/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const index = items.findIndex(item => item.id === id);

    if (index === -1) {
      return res.status(404).json({ error: "Item not found" });
    }

    items[index] = { ...items[index], ...req.body };

    // Invalidate cache
    await redisClient.del(CACHE_KEY);

    res.json({
      message: "Item updated",
      data: items[index]
    });

  } catch (err) {
    res.status(500).json({ error: "Error updating item" });
  }
});

// ✅ DELETE /items/:id (Invalidate Cache)
app.delete("/items/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const index = items.findIndex(item => item.id === id);

    if (index === -1) {
      return res.status(404).json({ error: "Item not found" });
    }

    const deletedItem = items.splice(index, 1);

    // Invalidate cache
    await redisClient.del(CACHE_KEY);

    res.json({
      message: "Item deleted",
      data: deletedItem[0]
    });

  } catch (err) {
    res.status(500).json({ error: "Error deleting item" });
  }
});

// -------------------
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});