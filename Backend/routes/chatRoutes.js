const express = require("express");
const router = express.Router();
const {getHistory,ask} = require("../Controller/chatcontroller");
const verifyToken = require("../middleware/auth");

router.get("/history", verifyToken, getHistory);
router.post("/ask", verifyToken, ask);

module.exports = router;
