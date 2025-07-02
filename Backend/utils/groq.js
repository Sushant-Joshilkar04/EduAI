const axios = require("axios");

const groqClient = axios.create({
  baseURL: "https://api.groq.com/openai", 
  headers: {
    Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    "Content-Type": "application/json",
  },
});

module.exports = groqClient;
