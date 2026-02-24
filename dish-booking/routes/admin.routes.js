// routes/admin.routes.js
router.get("/analytics", auth, role(["admin"]), async (req, res) => {
  const totalUsers = await User.countDocuments({ role: "user" });
  const totalChefs = await User.countDocuments({ role: "chef" });
  const totalOrders = await Order.countDocuments();

  const statusCount = await Order.aggregate([
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);

  res.json({
    totalUsers,
    totalChefs,
    totalOrders,
    statusCount,
  });
});