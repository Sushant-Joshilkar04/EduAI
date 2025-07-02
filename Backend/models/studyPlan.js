const mongoose = require("mongoose");

const studyPlanSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User",
    required: true
  },
  topics: {
    type: [String],
    required: true,
    validate: {
      validator: function(v) {
        return v && v.length > 0;
      },
      message: 'Topics array cannot be empty'
    }
  },
  deadlineDays: {
    type: Number,
    required: true,
    min: 1
  },
  hoursPerDay: {
    type: Number,
    required: true,
    min: 0.5
  },
  planData: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model("StudyPlan", studyPlanSchema);