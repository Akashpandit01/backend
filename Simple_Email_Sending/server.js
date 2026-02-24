const express = require("express");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

// create transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// route
app.get("/sendemail", async (req, res) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: [
        process.env.EMAIL_USER,
        "venugopal.burli@masaischool.com"
      ],
      subject: "Test Mail from NEM Student",
      text: "This is a testing Mail sent by NEM student, no need to reply.",
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      msg: "Email sent successfully ✅",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Failed to send email ❌",
      error: error.message,
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});