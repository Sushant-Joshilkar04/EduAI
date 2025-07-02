const axios = require("axios");

const generateSpeech = async (text) => {
  const response = await axios.post(
    `https://api.elevenlabs.io/v1/text-to-speech/YOUR_VOICE_ID`,
    {
      text,
      model_id: "eleven_monolingual_v1",
      voice_settings: { stability: 0.4, similarity_boost: 0.7 },
    },
    {
      headers: {
        "xi-api-key": process.env.Eleven_LAB,
        "Content-Type": "application/json",
      },
      responseType: "arraybuffer", 
    }
  );

  return response.data;
};

module.exports = { generateSpeech };
