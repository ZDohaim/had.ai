const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: "sk-proj-z2MHtJVdxeGPdXYSVCvCT3BlbkFJeZyQt4DQo3aNPtTaiS",
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
  } = req.body;

  const prompt = `Generate gift ideas for a ${gender}, aged ${ageRange}, who is a ${relationship}. Price range: ${priceRange}, Gift type: ${giftType}, Occasion: ${occasion}, Interests: ${interests}.`;

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      max_tokens: 512,
      temperature: 0,
      prompt: prompt,
    });

    res.json({ giftIdeas: completion.data.choices[0].text });
  } catch (error) {
    console.error("Error generating gift ideas:", error);
    res.status(500).json({ error: "Failed to generate gift ideas" });
  }
});

const port = 8080;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
