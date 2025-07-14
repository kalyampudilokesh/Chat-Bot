const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  type: { type: String, enum: ['faq', 'document', 'guide', 'policy'], default: 'faq' },
  filePath: { type: String },
  fileName: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("Document", DocumentSchema);
