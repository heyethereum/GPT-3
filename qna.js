const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
(async () => {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: "Write a hello world program with Solidity",
      temperature: 0.7,
      max_tokens: 100,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });

    console.log(response.data.choices);
  } catch (error) {
    console.log(error);
  }
})();
