const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize Gemini API client
// Note: You need to set GEMINI_API_KEY in your .env file
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey || apiKey === 'your_gemini_api_key_here') {
  console.warn('WARNING: GEMINI_API_KEY is not configured properly in .env');
}
const ai = new GoogleGenAI({});

function cleanAndParseJSON(text) {
  let cleaned = text.trim();
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '').trim();
  }
  return JSON.parse(cleaned);
}

app.post('/api/generate-campaign', async (req, res) => {
  try {
    const { 
      productName, 
      productDescription, 
      category, 
      audience, 
      brandTone, 
      platform, 
      language 
    } = req.body;

    const prompt = `
      You are an expert AI marketing strategist and copywriter.
      Generate a high-converting, personalized marketing campaign for the following product:
      
      Product Name: ${productName}
      Description: ${productDescription}
      Category: ${category}
      Target Audience: ${audience}
      Brand Tone: ${brandTone}
      Platform: ${platform}
      Language: ${language}
      
      You must respond in strict JSON format matching the following schema. Do NOT include markdown formatting (like \`\`\`json) or any other text, JUST the JSON object:
      {
        "slogan": "catchy slogan",
        "caption": "engaging caption optimized for the platform",
        "hashtags": ["#tag1", "#tag2", "#tag3"],
        "cta": "call to action text",
        "adCopy": "persuasive marketing copy",
        "engagementPrediction": "High/Medium/Low",
        "audienceInsight": "why this appeals to the audience",
        "campaignScore": {
          "quality": 85,
          "emotionalImpact": 90,
          "creativity": 88,
          "audienceMatch": 95
        },
        "emotionalAnalysis": {
          "excitementLevel": 80,
          "trustLevel": 90,
          "luxuryAppeal": 70,
          "genZCompatibility": 85
        },
        "strategyInsight": "brief explanation of why this campaign strategy works"
      }
    `;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        }
    });

    const resultText = response.text;
    const jsonResult = cleanAndParseJSON(resultText);

    res.json(jsonResult);
  } catch (error) {
    console.error('Error generating campaign:', error);
    res.status(500).json({ error: 'Failed to generate campaign', details: error.message });
  }
});

app.post('/api/generate-comparison', async (req, res) => {
  try {
    const { 
      productName, 
      productDescription, 
      audiences, // Array of strings (e.g., ["Students", "Professionals"])
      brandTone, 
      platform, 
      language 
    } = req.body;

    const prompt = `
      You are an expert AI marketing strategist.
      Generate different marketing outputs for the SAME product but tailored for MULTIPLE DIFFERENT target audiences.
      
      Product Name: ${productName}
      Description: ${productDescription}
      Brand Tone: ${brandTone}
      Platform: ${platform}
      Language: ${language}
      Audiences to target: ${audiences.join(', ')}
      
      You must respond in strict JSON format. Do NOT include markdown formatting (like \`\`\`json) or any other text, JUST the JSON object:
      {
        "comparisons": [
          {
            "audience": "Target Audience 1",
            "slogan": "catchy slogan tailored to this audience",
            "caption": "social media caption for this audience",
            "cta": "call to action",
            "hashtags": ["#tag1", "#tag2", "#tag3"],
            "emotionalTone": "e.g., Energetic, Premium, Aggressive",
            "engagementScore": 95,
            "emotionalAnalysis": {
              "excitement": 90,
              "trust": 70,
              "urgency": 85
            },
            "psychologyInsight": "Detailed commentary explaining why this specific strategy and tone appeals to this demographic's psychological triggers."
          }
        ]
      }
    `;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        }
    });

    const resultText = response.text;
    const jsonResult = cleanAndParseJSON(resultText);

    res.json(jsonResult);
  } catch (error) {
    console.error('Error generating comparison:', error);
    res.status(500).json({ error: 'Failed to generate comparison', details: error.message });
  }
});

if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  app.listen(port, () => {
    console.log(`Backend server running on port ${port}`);
  });
}

module.exports = app;
