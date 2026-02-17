const express = require("express");
const User = require("../models/User");
const Book = require("../models/Book");

const router = express.Router();


// ➕ Add User
router.post("/add-user", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ msg: "User added", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// ➕ Add Book
router.post("/add-book", async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json({ msg: "Book added", book });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// 📚 Rent Book
router.post("/rent-book", async (req, res) => {
  try {
    const { userId, bookId } = req.body;

    const user = await User.findById(userId);
    const book = await Book.findById(bookId);

    if (!user || !book) {
      return res.status(404).json({ msg: "User or Book not found" });
    }

    if (user.rentedBooks.includes(bookId)) {
      return res.status(400).json({ msg: "Book already rented by this user" });
    }

    user.rentedBooks.push(bookId);
    book.rentedBy.push(userId);

    await user.save();
    await book.save();

    res.json({ msg: "Book rented successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// 🔁 Return Book
router.post("/return-book", async (req, res) => {
  try {
    const { userId, bookId } = req.body;

    await User.findByIdAndUpdate(userId, {
      $pull: { rentedBooks: bookId }
    });

    await Book.findByIdAndUpdate(bookId, {
      $pull: { rentedBy: userId }
    });

    res.json({ msg: "Book returned successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// 👤 Get User Rentals
router.get("/user-rentals/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .populate("rentedBooks", "title author genre");

    if (!user) return res.status(404).json({ msg: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// 📖 Get Book Renters
router.get("/book-renters/:bookId", async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId)
      .populate("rentedBy", "name email");

    if (!book) return res.status(404).json({ msg: "Book not found" });

    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✏️ Update Book
router.put("/update-book/:bookId", async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.bookId,
      req.body,
      { new: true }
    );

    res.json({ msg: "Book updated", book });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// ❌ Delete Book + Cleanup Users
router.delete("/delete-book/:bookId", async (req, res) => {
  try {
    const bookId = req.params.bookId;

    await User.updateMany(
      { rentedBooks: bookId },
      { $pull: { rentedBooks: bookId } }
    );

    await Book.findByIdAndDelete(bookId);

    res.json({ msg: "Book deleted and user rentals updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;