
const express = require("express");
const router4 = express.Router(); // ✅ Capital R
const Feed = require("../model/Feedback"); // ✅ Ensure correct path
const feedUpdate=require("../controller/Admin")
router4.patch("/api/reviews/:id",feedUpdate, async (req, res) => {
  try {
    const id = req.params.id;

    const updatedReview = await Feed.findByIdAndUpdate(
      id,
    {message:req.body.message},
      {
        new: true,           
        runValidators: true   
      }
    );

    if (!updatedReview) {
      return res.status(404).json({ message: "Review not found" });
    }

    return res.status(200).json({
      message: "Review updated successfully",
      data: updatedReview
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server-side error" });
  }
});
router4.delete("/api/reviews/:id", feedUpdate, async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Review ID not provided in request" });
    }

    const deletedReview = await Feed.findByIdAndDelete(id);

    if (!deletedReview) {
      return res.status(404).json({ message: "Review not found" });
    }

    return res.status(200).json({ message: "Feed deleted successfully" });

  } catch (err) {
    console.error("Error deleting review:", err);
    return res.status(500).json({ message: "Server-side error" });
  }
});
module.exports = router4;
