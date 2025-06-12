const Feed = require("../model/Feedback");
const mongoose = require("mongoose");
const express = require("express");
const router2 = express.Router();

// POST feedback
router2.post("/api/feedback", async (req, res) => {
  try {
    const { message, rating, userId } = req.body;

    // Validate input
    if (!message || !rating || !userId) {
      return res.status(400).json({ message: "All fields (message, rating, userId) are required." });
    }

    const feed = new Feed({ message, rating, userId });
    await feed.save();

    return res.status(201).json({ message: "Feedback submitted successfully." });
  } catch (err) {
    console.error("Error submitting feedback:", err);
    res.status(500).json({ message: "Server error while submitting feedback." });
  }
});

// GET all feedback
router2.get("/api/feedback", async (req, res) => {
  try {
    const feed = await Feed.find({});

    if (feed.length === 0) {
      return res.status(404).json({ message: "No feedback found." });
    }

    return res.status(200).json({ feedback: feed });
  } catch (err) {
    console.error("Error fetching feedback:", err);
    return res.status(500).json({ message: "Server error while fetching feedback.", error: err.message });
  }
});

module.exports = router2;
