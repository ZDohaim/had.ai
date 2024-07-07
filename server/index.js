const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const OpenAI = require("openai");
const axiosRetry = require("axios-retry");

const openai = new OpenAI({
  apiKey: "your_openai_api_key", // Ensure your API key is correct
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/api/gift-ideas", async (req, res) => {
  const {
    gender,
    ageRange,
    relationship,
    priceRange,
    giftType,
    occasion,
    interests,
    other, // Handle other text
  } = req.body;

  const messages = [
    { role: "system", content: "You are a helpful assistant." },
    {
      role: "user",
      content: `Generate gift ideas for a ${gender}, aged ${ageRange}, who is a ${relationship}. Price range: ${priceRange}, Gift type: ${giftType}, Occasion: ${occasion}, Interests: ${interests}, Other: ${other}.`,
    },
  ];

  console.log("Received request with messages:", messages); // Log the request messages

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
      max_tokens: 50,
      temperature: 0,
    });

    console.log(chatCompletion.choices[0].message.content);

    res.json({ giftIdeas: chatCompletion.choices[0].message.content });
  } catch (error) {
    console.error(
      "Error generating gift ideas:",
      error.response ? error.response.data : error.message
    ); // Log the exact error
    res.status(500).json({ error: "Failed to generate gift ideas" });
  }
});

const port = 8080;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
