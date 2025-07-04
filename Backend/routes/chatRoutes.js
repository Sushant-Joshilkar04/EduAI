const express = require("express");
const router = express.Router();
const {getHistory,ask,deleteChat} = require("../Controller/chatcontroller");
const verifyToken = require("../middleware/auth");

router.get("/history", verifyToken, getHistory);
router.post("/ask", verifyToken, ask);
router.delete("/delete/:sessionId",verifyToken,deleteChat);

module.exports = router;
