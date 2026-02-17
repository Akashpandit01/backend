const express = require("express");
const Book = require("../models/Book");
const Member = require("../models/Member");

const router = express.Router();


// ➕ Add Book
router.post("/add-book", async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json({ msg: "Book added", book });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// ➕ Add Member
router.post("/add-member", async (req, res) => {
  try {
    const member = await Member.create(req.body);
    res.status(201).json({ msg: "Member added", member });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// 📚 Borrow Book
router.post("/borrow-book", async (req, res) => {
  try {
    const { memberId, bookId } = req.body;

    const member = await Member.findById(memberId);
    const book = await Book.findById(bookId);

    if (!member || !book) {
      return res.status(404).json({ msg: "Member or Book not found" });
    }

    if (book.status === "borrowed") {
      return res.status(400).json({ msg: "Book is already borrowed" });
    }

    member.borrowedBooks.push(bookId);
    book.borrowers.push(memberId);
    book.status = "borrowed";

    await member.save();
    await book.save();

    res.json({ msg: "Book borrowed successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// 🔁 Return Book
router.post("/return-book", async (req, res) => {
  try {
    const { memberId, bookId } = req.body;

    await Member.findByIdAndUpdate(memberId, {
      $pull: { borrowedBooks: bookId }
    });

    const book = await Book.findByIdAndUpdate(bookId, {
      $pull: { borrowers: memberId }
    }, { new: true });

    // 🔁 Post logic: update status if no borrowers
    if (book.borrowers.length === 0) {
      book.status = "available";
      await book.save();
    }

    res.json({ msg: "Book returned successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// 👤 Get Member Borrowed Books
router.get("/member-borrowed-books/:memberId", async (req, res) => {
  try {
    const member = await Member.findById(req.params.memberId)
      .populate("borrowedBooks", "title author status");

    if (!member) return res.status(404).json({ msg: "Member not found" });

    res.json(member);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// 📖 Get Book Borrowers
router.get("/book-borrowers/:bookId", async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId)
      .populate("borrowers", "name email");

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


// ❌ Delete Book + Cleanup Members
router.delete("/delete-book/:bookId", async (req, res) => {
  try {
    const bookId = req.params.bookId;

    await Member.updateMany(
      { borrowedBooks: bookId },
      { $pull: { borrowedBooks: bookId } }
    );

    await Book.findByIdAndDelete(bookId);

    res.json({ msg: "Book deleted and member records updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;