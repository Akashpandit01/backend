const { MongoClient } = require("mongodb");
const data = require("../data/sales.json");

const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

async function insertData() {
  try {
    await client.connect();
    const db = client.db("salesDB");
    const collection = db.collection("sales");

    await collection.deleteMany({});
    await collection.insertMany(data);

    console.log("✅ Sales data inserted successfully!");
  } catch (err) {
    console.error("❌ Error inserting data:", err);
  } finally {
    await client.close();
  }
}

insertData();