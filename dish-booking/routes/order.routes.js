// routes/order.routes.js
router.get("/my", auth, role(["user"]), async (req, res) => {
  const orders = await Order.find({ user: req.user.userId })
    .populate("dish")
    .populate("chef", "name email");

  res.json(orders);
});