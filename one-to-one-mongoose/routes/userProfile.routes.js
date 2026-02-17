const express = require("express");
const User = require("../models/User");
const Profile = require("../models/Profile");

const router = express.Router();


// ➕ Add User
router.post("/add-user", async (req, res) => {
  try {
    const { name, email } = req.body;

    const user = new User({ name, email });
    await user.save();

    res.status(201).json({ msg: "User created", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// ➕ Add Profile
router.post("/add-profile", async (req, res) => {
  try {
    const { bio, socialMediaLinks, user } = req.body;

    // Check if user exists
    const userExists = await User.findById(user);
    if (!userExists) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Create profile
    const profile = new Profile({
      bio,
      socialMediaLinks,
      user
    });

    await profile.save();

    res.status(201).json({ msg: "Profile created", profile });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// 📄 Get All Profiles with User Details (Populate)
router.get("/profiles", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", "name email");
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;