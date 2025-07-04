const express = require("express");
const router = express.Router();
const { generateStudyPlan,getAllStudyPlans,getStudyPlanById,deleteStudyPlan } = require("../Controller/studyController");
const verifyToken = require("../middleware/auth");

router.post("/study-plan", verifyToken,generateStudyPlan);
router.get("/study-plans", verifyToken, getAllStudyPlans);
router.get("/study-plan/:id", verifyToken, getStudyPlanById);   
router.delete("/study-plan/:id", verifyToken, deleteStudyPlan);

module.exports = router;
