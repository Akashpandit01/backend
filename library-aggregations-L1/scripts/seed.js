require("dotenv").config();
const { MongoClient } = require("mongodb");
const books = require("../data/books.json");
const borrowers = require("../data/borrowers.json");
const loans = require("../data/loans.json");

const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

async function seed() {
  try {
    await client.connect();
    const db = client.db("libraryAggL1");

    await db.collection("books").deleteMany({});
    await db.collection("borrowers").deleteMany({});
    await db.collection("loans").deleteMany({});

    // Convert date strings to Date objects
    const borrowersWithDates = borrowers.map(b => ({
      ...b,
      membershipDate: new Date(b.membershipDate)
    }));

    const loansWithDates = loans.map(l => ({
      ...l,
      loanDate: new Date(l.loanDate),
      returnDate: l.returnDate ? new Date(l.returnDate) : null
    }));

    await db.collection("books").insertMany(books);
    await db.collection("borrowers").insertMany(borrowersWithDates);
    await db.collection("loans").insertMany(loansWithDates);

    console.log("✅ Library data seeded successfully");
  } catch (e) {
    console.error("❌ Seeding failed:", e);
  } finally {
    await client.close();
  }
}

seed();