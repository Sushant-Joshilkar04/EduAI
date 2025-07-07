const axios = require("axios");  
const pdf = require("pdf-parse"); 
const Speech = require("../models/speech"); 
const cloudinary = require("../utils/cloudinary");
const groqClient = require("../utils/groq");
const fs = require("fs");
const path = require("path");

exports.uploadPDFAndGeneratePodcast = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: "User authentication required" });
    }

    const file = req.file;
    if (!file || !file.path) {
      return res.status(400).json({ error: "PDF upload failed or missing file path" });
    }

    const fileUrl = file.path;
    const fileName = file.originalname || file.filename || "Untitled Document";

    // Read PDF directly from uploaded file
    const buffer = fs.readFileSync(file.path);
    const data = await pdf(buffer);
    const text = data?.text || "";

    if (!text || text.length < 100) {
      return res.status(400).json({ error: "PDF text is too short or unreadable." });
    }

    const clippedText = text.substring(0, 5000);

    const prompt = `You are an expert podcast creator and educational content adapter. Transform the following educational content into an engaging, conversational podcast-style script with emotional annotations for text-to-speech synthesis.

Use emotional annotations like [excited], [thoughtful], [conversational], [emphatic], [curious], [reassuring], [surprised], [confident], [whispering], [chuckling], [dramatic pause], [building excitement].

Create a natural, engaging conversation (2,500-4,000 words) that sounds like a knowledgeable friend explaining concepts. Structure it with:
1. Hook opening with intrigue
2. Concept introduction with analogies  
3. Deep dive sections with enthusiasm
4. Practical applications
5. Conclusion with key takeaways

Content to transform: ${clippedText}

And Dont add asterics or any other formatting, just return the text as a podcast script.

Return ONLY the podcast script text with emotional annotations, no JSON formatting.`;

    const response = await groqClient.post("https://api.groq.com/openai/v1/chat/completions", {
      model: "llama3-8b-8192",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 4000,
    });

    const scriptText = response.data.choices[0].message.content;

    if (!scriptText || scriptText.length < 20) {
      return res.status(400).json({ error: "Script too short or missing." });
    }

    const voiceId = process.env.ELEVENLABS_VOICE_ID || "21m00Tcm4TlvDq8ikWAM";
    const ttsResponse = await axios.post(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        text: scriptText,
        model_id: "eleven_multilingual_v2",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.8,
        },
      },
      {
        headers: {
          "xi-api-key": process.env.Eleven_LAB,
          "Content-Type": "application/json",
        },
        responseType: "arraybuffer",
      }
    );

    // Create temp directory if it doesn't exist
    const tempDir = path.join(__dirname, "../temp");
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    const tempPath = path.join(tempDir, `${Date.now()}.mp3`);
    fs.writeFileSync(tempPath, ttsResponse.data);

    const uploadRes = await cloudinary.uploader.upload(tempPath, {
      resource_type: "video",
      folder: "eduai/audio",
      public_id: `podcast-${Date.now()}`,
    });

    // Clean up temp file
    fs.unlinkSync(tempPath);
    // Clean up uploaded PDF file
    fs.unlinkSync(file.path);

    // Save to database
    const document = new Speech({
      userId: req.user._id,
      fileName,
      fileUrl: uploadRes.secure_url,
      extractedText: text,
      aiGenerated: scriptText,
      audioUrl: uploadRes.secure_url,
    });

    await document.save();

    return res.status(200).json({
      message: "Podcast generated successfully",
      documentId: document._id,
      fileName,
      audioUrl: uploadRes.secure_url,
      script: scriptText,
    });
  } catch (error) {
    console.error("Podcast Generation Error:", error);

    try {
      if (req.file && req.file.path && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
    } catch (cleanupError) {
      console.error("Cleanup error:", cleanupError);
    }

    if (error.response) {
      return res.status(500).json({
        error: "API Error",
        details: error.response.data?.error?.message || "Unknown API error",
      });
    }

    return res.status(500).json({
      error: "Server Error",
      details: error.message,
    });
  }
};

exports.getMyPodcasts = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: "User authentication required" });
    }

    const podcasts = await Speech.find({ userId: req.user._id })
      .select('fileName audioUrl createdAt')
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Podcasts retrieved successfully",
      podcasts: podcasts.map(podcast => ({
        id: podcast._id,
        title: podcast.fileName,
        name: podcast.fileName,
        audioUrl: podcast.audioUrl,
        createdAt: podcast.createdAt
      })),
    });
  } catch (error) {
    console.error("Get Podcasts Error:", error);
    return res.status(500).json({
      error: "Server Error",
      details: error.message,
    });
  }
};

exports.getPodcastById = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: "User authentication required" });
    }

    const { id } = req.params;
    const podcast = await Speech.findOne({ 
      _id: id, 
      userId: req.user._id 
    });

    if (!podcast) {
      return res.status(404).json({ error: "Podcast not found" });
    }

    return res.status(200).json({
      message: "Podcast retrieved successfully",
      podcast: {
        id: podcast._id,
        title: podcast.fileName,
        name: podcast.fileName,
        audioUrl: podcast.audioUrl,
        script: podcast.aiGenerated,
        extractedText: podcast.extractedText,
        createdAt: podcast.createdAt
      },
    });
  } catch (error) {
    console.error("Get Podcast Error:", error);
    return res.status(500).json({
      error: "Server Error",
      details: error.message,
    });
  }
};

exports.deletePodcast = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: "User authentication required" });
    }

    const { id } = req.params;
    const podcast = await Speech.findOneAndDelete({ 
      _id: id, 
      userId: req.user._id 
    });

    if (!podcast) {
      return res.status(404).json({ error: "Podcast not found" });
    }

    if (podcast.audioUrl) {
      const publicId = path.basename(podcast.audioUrl, path.extname(podcast.audioUrl));
      await cloudinary.uploader.destroy(`eduai/audio/${publicId}`, { resource_type: "video" });
    }

    return res.status(200).json({
      message: "Podcast deleted successfully",
    });
  } catch (error) {
    console.error("Delete Podcast Error:", error);
    return res.status(500).json({
      error: "Server Error",
      details: error.message,
    });
  }
};

exports.deletePodcastById = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: "User authentication required" });
    }

    const { id } = req.params;
    const podcast = await Speech.findOneAndDelete({ 
      _id: id, 
      userId: req.user._id 
    });

    if (!podcast) {
      return res.status(404).json({ error: "Podcast not found" });
    }

    if (podcast.audioUrl) {
      const publicId = path.basename(podcast.audioUrl, path.extname(podcast.audioUrl));
      await cloudinary.uploader.destroy(`eduai/audio/${publicId}`, { resource_type: "video" });
    }

    return res.status(200).json({
      message: "Podcast deleted successfully",
    });
  } catch (error) {
    console.error("Delete Podcast Error:", error);
    return res.status(500).json({
      error: "Server Error",
      details: error.message,
    });
  }
}