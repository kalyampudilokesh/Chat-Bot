const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Example Mongoose model
const Document = mongoose.model("Document", new mongoose.Schema({
  title: String,
  content: String,
  type: String,
  filename: String,
}));

router.post("/upload", async (req, res) => {
  const { title, content, type } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }

  try {
    const doc = new Document({
      title,
      content,
      type,
      filename: null, // update if you add file uploads
    });

    await doc.save();

    res.json({ message: "✅ Document uploaded successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to upload document" });
  }
});

module.exports = router;
