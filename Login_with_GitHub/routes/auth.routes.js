const express = require("express");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

/**
 * Step 1: Redirect user to GitHub login
 */
router.get("/github", (req, res) => {
  const redirectURL = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=user:email`;
  res.redirect(redirectURL);
});

/**
 * Step 2: GitHub callback
 */
router.get("/github/callback", async (req, res) => {
  const { code } = req.query;

  try {
    // Exchange code for access token
    const tokenRes = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code
      },
      { headers: { Accept: "application/json" } }
    );

    const accessToken = tokenRes.data.access_token;

    // Fetch user profile
    const userRes = await axios.get("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    const { id, login, avatar_url } = userRes.data;

    // Fetch email (sometimes private)
    const emailRes = await axios.get("https://api.github.com/user/emails", {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    const primaryEmailObj = emailRes.data.find(e => e.primary) || emailRes.data[0];
    const email = primaryEmailObj?.email || null;

    // Save user if not exists
    let user = await User.findOne({ githubId: id });

    if (!user) {
      user = await User.create({
        githubId: id,
        username: login,
        email,
        avatar: avatar_url
      });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, githubId: user.githubId },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user
    });

  } catch (error) {
    console.log(error.response?.data || error.message);
    res.status(500).json({ error: "GitHub Login Failed" });
  }
});

module.exports = router;