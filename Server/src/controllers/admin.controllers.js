const Document = require("../models/Document.model");

exports.uploadDocument = async (req, res) => {
  try {
    const { title, content, type } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }

    let filePath = null;
    let fileName = null;

    if (req.file) {
      filePath = req.file.path;
      fileName = req.file.originalname;
    }

    const doc = await Document.create({
      title,
      content,
      type,
      filePath,
      fileName,
    });

    return res.json({ message: "Document uploaded", document: doc });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to upload document" });
  }
};

exports.getDocuments = async (req, res) => {
  try {
    const docs = await Document.find().sort({ createdAt: -1 });
    return res.json(docs);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch documents" });
  }
};
