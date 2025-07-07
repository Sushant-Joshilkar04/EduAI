const express = require("express");
const router = express.Router();
const {getHistory,ask,deleteChat,updateChatName} = require("../Controller/chatcontroller");
const verifyToken = require("../middleware/auth");

router.get("/history", verifyToken, getHistory);
router.post("/ask", verifyToken, ask);
router.delete("/delete/:sessionId",verifyToken,deleteChat);
router.put("/update-name/:sessionId", verifyToken,updateChatName)

module.exports = router;
