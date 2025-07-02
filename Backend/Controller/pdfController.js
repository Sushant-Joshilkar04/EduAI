const axios = require("axios")  
const pdf = require("pdf-parse"); 
const Document = require("../models/pdfDoc");
const groqClient = require("../utils/groq");

exports.uploadPDFAndGenerateAI = async (req, res) => {
  try {
    if (!req.user || !req.user._id ) {
      return res.status(401).json({ error: "User authentication required" });
    }

    const file = req.file;
    if (!file || !file.path) {
      return res.status(400).json({ error: "PDF upload failed or missing file path" });
    }

    const fileUrl = file.path;
    console.log("Uploaded PDF to Cloudinary:", fileUrl);

    const fileName = file.originalname || file.filename || 'Untitled Document';

    const fileResponse = await axios.get(fileUrl, { 
      responseType: "arraybuffer",
      timeout: 30000 
    });
    const buffer = Buffer.from(fileResponse.data);

    const data = await pdf(buffer);
    const text = data?.text || "";

    if (!text || text.length < 100) {
      return res.status(400).json({ error: "PDF text is too short or unreadable." });
    }

    const clippedText = text.substring(0, 5000);

    const prompt = `Analyze the following study material and create comprehensive learning resources: ${clippedText}

    Generate a JSON response with these study components:

    1. **Summary**: Extract 5-7 key concepts that capture the main ideas and important details
    2. **Flashcards**: Create 8-12 focused question-answer pairs covering:
   - Key definitions and terminology
   - Important facts and figures  
   - Cause-and-effect relationships
   - Main concepts and principles
    3. **Multiple Choice Questions**: Generate 4-6 questions testing:
   - Comprehension of main ideas
   - Application of concepts
   - Analysis of relationships between ideas

    Format as valid JSON:
    {
    "summary": [
    "Key point covering main concept 1",
    "Important detail or principle 2", 
    "Critical information point 3",
    "Essential concept or relationship 4",
    "Significant fact or conclusion 5"
  ],
  "flashcards": [
    {"question": "Clear, specific question", "answer": "Concise, accurate answer"},
    {"question": "Definition or concept question", "answer": "Complete explanation"},
    {"question": "Application or example question", "answer": "Detailed response with context"}
  ],
  "mcqs": [
    {
      "question": "Test understanding of key concept",
      "options": ["Correct answer", "Plausible distractor", "Related but incorrect", "Clear incorrect option"],
      "correct_answer": 0,
      "explanation": "Brief explanation of why this answer is correct"
    }
  ]
}

    Requirements:
   - Make flashcards specific and testable
   - Ensure MCQ distractors are plausible but clearly incorrect
   - Cover different difficulty levels from basic recall to application
   - Focus on the most important and testable content
   - Return only valid JSON, no additional text.`;

    const response = await groqClient.post("https://api.groq.com/openai/v1/chat/completions", {
      model: "llama3-8b-8192",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 2000
    });

    const aiOutput = response.data.choices[0].message.content;

    // console.log(aiOutput);
    

    let parsedAIOutput;
    try {
      const jsonMatch = aiOutput.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsedAIOutput = JSON.parse(jsonMatch[0]);
      } else {
        parsedAIOutput = JSON.parse(aiOutput);
      }
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError);
      parsedAIOutput = { 
        summary: ["Failed to parse AI response"], 
        flashcards: [], 
        mcqs: [] 
      };
    }

    const document = new Document({
      userId: req.user._id,
      fileName: fileName, 
      fileUrl,
      extractedText: text,
      aiGenerated: JSON.stringify(parsedAIOutput),
    });

    await document.save();

    return res.status(200).json({
      message: "Upload and AI processing successful",
      id: document._id,
      fileName: fileName,
      fileUrl,
      aiContent: parsedAIOutput,
      documentId: document._id
    });

  } catch (error) {
    console.error("Upload Error:", error.message);
    
    if (error.response) {
      console.error("API Error:", error.response.data);
      return res.status(500).json({ 
        error: "AI processing failed", 
        details: error.response.data?.error?.message || "Unknown API error"
      });
    }
    
    if (error.code === 'ECONNABORTED') {
      return res.status(500).json({ error: "Request timeout - PDF too large or slow connection" });
    }
    
    res.status(500).json({ 
      error: "PDF processing failed", 
      details: error.message 
    });
  }
};

exports.getMyDocuments = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: "User authentication required" });
    }

    const docs = await Document.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .select('_id fileName fileUrl createdAt');

    const transformedDocs = docs.map(doc => ({
      id: doc._id,
      name: doc.fileName || 'Untitled Document',
      filename: doc.fileName || 'Untitled Document',
      fileUrl: doc.fileUrl,
      createdAt: doc.createdAt,
      uploadDate: doc.createdAt
    }));

    res.json(transformedDocs);
  } catch (err) {
    console.error("Get Documents Error:", err.message);
    res.status(500).json({ error: "Failed to fetch documents" });
  }
};

exports.getDataById = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ error: "Document ID is required" });
    }

    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: "User authentication required" });
    }

    const document = await Document.findOne({ 
      _id: id, 
      userId: req.user._id 
    });
    
    if (!document) {
      return res.status(404).json({ error: "Document not found or access denied" });
    }

    let aiContent = null;
    if (document.aiGenerated) {
      try {
        aiContent = JSON.parse(document.aiGenerated);
      } catch (parseError) {
        console.error("Error parsing AI content:", parseError);
        aiContent = { summary: [], flashcards: [], mcqs: [] };
      }
    }

    return res.status(200).json({ 
      id: document._id,
      name: document.fileName || 'Untitled Document',
      filename: document.fileName || 'Untitled Document',
      fileUrl: document.fileUrl,
      aiContent: aiContent,
      createdAt: document.createdAt
    });
  } catch (error) {
    console.error("Get Document Error:", error.message);
    return res.status(500).json({ error: "Failed to retrieve document" });
  }
};