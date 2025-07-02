// models/chat.js
const mongoose = require("mongoose");

const speechSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  fileName: {
    type: String,
    default: "Untitled Document",
  },
  fileUrl: String,
  extractedText: String,
  aiGenerated: String,
  audioUrl: String, 
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Speech", speechSchema);
