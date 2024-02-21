const axios = require("axios");
const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();
const port = process.env.port;
const app = express();
app.use(express.json());
// console.log(process.env.OPENAI_API_KEY);
const config = new Configuration({ apiKey: process.env.OPENAI_API_KEY });

const openAi = new OpenAIApi(config);

app.post("/generate", async (req, res) => {
  try {
    const response = await openAi.createCompletion({
      model: "text-davinci-003",
      prompt: `Write a poem on the topic star 
         ###
        `,
      max_tokens: 64,
      temperature: 0,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      stop: ["\n"],
    });
    return res.status(200).json({
      success: true,
      data: response.data.choices[0].text,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

app.listen(port, () => {
  console.log("Server is running on port: " + port);
});
