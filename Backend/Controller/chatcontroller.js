const Chat = require("../models/chat");
const groqClient = require("../utils/groq");

exports.getHistory = async (req, res) => {
  try {
    const chats = await Chat.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(chats);
  } catch (err) {
    res.status(500).json({ error: "Unable to fetch chat history" });
  }
}

exports.ask = async (req, res) => {
  const { message, context, sessionId } = req.body;

  const prompt = `You're a helpful AI tutor. Given the following user doubt and context, respond clearly and concisely.Context (if any):${context || "None"}Question:${message}Answer:
  Note: Do not use asterisks or formatting marks in the response`;

  

    try {
        const response = await groqClient.post("/v1/chat/completions", {
        model: "llama3-8b-8192",
        messages: [{ role: "user", content: prompt }],
    });

    const aiReply = response.data.choices[0].message.content;

    await Chat.findOneAndUpdate(
      { userId: req.user._id, sessionId },
      {
        $push: {
          messages: [
            { role: "user", message },
            { role: "ai", message: aiReply },
          ],
        },
      },
      { upsert: true }
    );

    res.status(200).json({ reply: aiReply });
  } catch (err) {
    console.error("Ask Chat Error:", err.message);
    res.status(500).json({ error: "AI Tutor failed" });
  }
};

exports.deleteChat = async (req, res) => {  
  const { sessionId } = req.params;
  console.log("I am in backend");
  
  try {
    await Chat.findOneAndDelete({ userId: req.user._id, sessionId });
    res.status(200).json({ message: "Chat deleted successfully" });
  } catch (err) {
    console.error("Delete Chat Error:", err.message);
    res.status(500).json({ error: "Failed to delete chat" });
  }
}

exports.updateChatName = async (req, res) => {
  const { sessionId } = req.params;
  const { name } = req.body;

  try {
    const updatedChat = await Chat.findOneAndUpdate(
      { userId: req.user._id, sessionId },
      { name },
      { new: true }
    );

    if (!updatedChat) {
      return res.status(404).json({ error: "Chat not found" });
    }

    res.status(200).json(updatedChat);
  } catch (err) {
    console.error("Update Chat Name Error:", err.message);
    res.status(500).json({ error: "Failed to update chat name" });
  }
};