const groqClient = require("../utils/groq");
const StudyPlan = require("../models/studyPlan");

exports.generateStudyPlan = async (req, res) => {
  try {
    const { topics, deadlineDays, hoursPerDay } = req.body;
    const userId = req.user?.id || req.user?._id || req.user.userId; 

    // console.log("Auth user object:", req.user); 
    // console.log("Extracted userId:", req.user.userId); 

    if (!userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    if (!topics || !Array.isArray(topics) || topics.length === 0) {
      return res.status(400).json({ error: "Topic list is required" });
    }

    if (!deadlineDays || deadlineDays <= 0) {
      return res.status(400).json({ error: "Valid deadline days required" });
    }

    if (!hoursPerDay || hoursPerDay <= 0) {
      return res.status(400).json({ error: "Valid hours per day required" });
    }

const prompt = `You must respond with ONLY valid JSON, no explanations or additional text.

Create a NotebookLM-style hierarchical mindmap for these topics: ${topics.join(", ")}.
Deadline: ${deadlineDays} days, ${hoursPerDay} hours per day.

Requirements:
1. MAIN TOPIC on the left; 6–8 subtopics to the right, vertically stacked, all spaced to **avoid overlap**.
2. Each subtopic node must include up to 3 “explorer” child nodes (subdomains) branching right, each with labels and brief descriptions.
3. Use consistent spacing: vertical gaps between subtopics ≥80px; explorer nodes offset further right with smaller spacing.
4. Design with dark theme, rounded rectangles, subtle shadows, minimalist style (similar to roadmap.sh).
5. Apply visual hierarchy: main topic larger and darker; subtopics medium; explorers smaller.
   - Example: 'map layout' principles like visual hierarchy, spacing, balance applied.

Return this exact JSON structure **ONLY**:

{
  "nodes": [
    {
      "id": "main_topic",
      "type": "main",
      "data": { "label": "Main Topic" },
      "position": { "x": 100, "y": 300 },
      "style": { "background": "#222", "color": "#fff" }
    },
    {
      "id": "subtopic_1",
      "type": "subtopic",
      "data": { "label": "Subtopic 1" },
      "position": { "x": 700, "y": 100 },
      "style": { "background": "#333", "color": "#fff" }
    },
    {
      "id": "subtopic_1_child_1",
      "type": "subdomain",
      "data": { "label": "Explorer 1", "description": "Description...", "estimatedHours": 2 },
      "position": { "x": 1100, "y": 100 },
      "style": { "background": "#444", "color": "#fff" }
    }
    // More nodes as needed
  ],
  "edges": [
    { "id": "main-sub1", "source": "main_topic", "target": "subtopic_1", "type": "default" },
    { "id": "sub1-child1", "source": "subtopic_1", "target": "subtopic_1_child_1", "type": "default" }
    // More edges as needed
  ]
}
`;

    const response = await groqClient.post("https://api.groq.com/openai/v1/chat/completions", {
      model: "llama3-8b-8192",
      messages: [{ role: "user", content: prompt }],
    });

    const rawPlan = response.data.choices[0].message.content;

    // console.log(rawPlan);
    

    let parsedPlan;
    try {
      let cleanedResponse = rawPlan.trim();
      
      // Remove common markdown formatting
      cleanedResponse = cleanedResponse.replace(/^```json\s*/i, '');
      cleanedResponse = cleanedResponse.replace(/```\s*$/, '');
      
      // Remove any text before the first {
      const jsonStart = cleanedResponse.indexOf('{');
      if (jsonStart !== -1) {
        cleanedResponse = cleanedResponse.substring(jsonStart);
      }
      
      // Remove any text after the last }
      const jsonEnd = cleanedResponse.lastIndexOf('}');
      if (jsonEnd !== -1) {
        cleanedResponse = cleanedResponse.substring(0, jsonEnd + 1);
      }
      
      parsedPlan = JSON.parse(cleanedResponse);
      
      // Validate the structure
      if (!parsedPlan.nodes || !Array.isArray(parsedPlan.nodes)) {
        throw new Error('Invalid structure: nodes array missing');
      }
      
    } catch (e) {
      console.error("AI Raw Response:", rawPlan);
      console.error("Parse Error:", e.message);
      
      // Fallback: create a simple plan manually
      parsedPlan = {
        nodes: topics.map((topic, index) => ({
          id: (index + 1).toString(),
          type: "topic",
          data: { label: topic },
          position: { x: 100 + (index * 200), y: 100 + (index * 100) }
        })),
        edges: topics.slice(1).map((_, index) => ({
          id: `e${index + 1}-${index + 2}`,
          source: (index + 1).toString(),
          target: (index + 2).toString(),
          type: "step"
        }))
      };
      
      console.log("Using fallback plan structure");
    }

    const newPlan = new StudyPlan({
      userId, 
      topics,
      deadlineDays,
      hoursPerDay,
      planData: parsedPlan,
    });

    await newPlan.save();

    return res.status(201).json({ 
      message: "Study plan created successfully", 
      plan: parsedPlan,
      planId: newPlan._id 
    });

  } catch (err) {
    console.error("Study Plan Error:", err.message);
    res.status(500).json({ error: "Failed to generate study plan" });
  }
};