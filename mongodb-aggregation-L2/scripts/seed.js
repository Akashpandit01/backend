require("dotenv").config();
const { MongoClient } = require("mongodb");
const orders = require("../data/orders.json");

const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

async function seed() {
  try {
    await client.connect();
    const db = client.db("mongoAggL1");

    await db.collection("orders").deleteMany({});
    await db.collection("orders").insertMany(orders);

    console.log("✅ Orders data inserted successfully");
  } catch (err) {
    console.error("❌ Error inserting data:", err);
  } finally {
    await client.close();
  }
}

seed();