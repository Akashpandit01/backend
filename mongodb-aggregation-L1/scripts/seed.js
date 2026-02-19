require("dotenv").config();
const { MongoClient } = require("mongodb");
const customers = require("../data/customers.json");
const orders = require("../data/orders.json");

const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

async function seed() {
  try {
    await client.connect();
    const db = client.db("mongoAggL0");

    await db.collection("customers").deleteMany({});
    await db.collection("orders").deleteMany({});

    await db.collection("customers").insertMany(customers);
    await db.collection("orders").insertMany(orders);

    console.log("✅ Data seeded successfully");
  } catch (err) {
    console.error("❌ Seeding error:", err);
  } finally {
    await client.close();
  }
}

seed();