const express = require("express");
const Booking = require("../models/Booking");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

const router = express.Router();

// Create booking (User)
router.post("/", authMiddleware, async (req, res) => {
  const { serviceName, dateTime } = req.body;

  const booking = await Booking.create({
    serviceName,
    dateTime,
    user: req.user.userId
  });

  res.status(201).json(booking);
});

// View bookings
router.get("/", authMiddleware, async (req, res) => {
  const query = req.user.role === "admin" 
    ? {} 
    : { user: req.user.userId };

  const bookings = await Booking.find(query).populate("user", "username email");
  res.json(bookings);
});

// Update booking (only pending & own)
router.put("/:id", authMiddleware, async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) return res.status(404).json({ msg: "Booking not found" });
  if (booking.user.toString() !== req.user.userId) return res.status(403).json({ msg: "Not your booking" });
  if (booking.status !== "pending") return res.status(400).json({ msg: "Cannot update after approval" });

  booking.serviceName = req.body.serviceName || booking.serviceName;
  booking.dateTime = req.body.dateTime || booking.dateTime;
  await booking.save();

  res.json(booking);
});

// Cancel booking
router.delete("/:id", authMiddleware, async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) return res.status(404).json({ msg: "Booking not found" });
  if (booking.user.toString() !== req.user.userId) return res.status(403).json({ msg: "Not your booking" });
  if (booking.status !== "pending") return res.status(400).json({ msg: "Cannot cancel after approval" });

  booking.status = "cancelled";
  await booking.save();

  res.json({ msg: "Booking cancelled" });
});

// Admin approve
router.patch("/:id/approve", authMiddleware, roleMiddleware("admin"), async (req, res) => {
  const booking = await Booking.findByIdAndUpdate(req.params.id, { status: "approved" }, { new: true });
  res.json(booking);
});

// Admin reject
router.patch("/:id/reject", authMiddleware, roleMiddleware("admin"), async (req, res) => {
  const booking = await Booking.findByIdAndUpdate(req.params.id, { status: "rejected" }, { new: true });
  res.json(booking);
});

// Admin delete
router.delete("/admin/:id", authMiddleware, roleMiddleware("admin"), async (req, res) => {
  await Booking.findByIdAndDelete(req.params.id);
  res.json({ msg: "Booking deleted by admin" });
});

module.exports = router;