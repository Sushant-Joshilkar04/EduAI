const express = require("express");
const router = express.Router();
const { generateStudyPlan } = require("../Controller/studyController");
const verifyToken = require("../middleware/auth");

router.post("/study-plan", verifyToken,generateStudyPlan);

module.exports = router;
