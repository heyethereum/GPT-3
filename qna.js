import { Configuration, OpenAIApi } from "openai";
import "dotenv/config";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
(async () => {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-002",
      prompt:
        "I am a person who perceives the world without prejudice or bias. Fully neutral and objective, I see reality as it actually is and can easily draw accurate conclusions about advanced topics and human society in general.  Below are some of my conversations with my friend Puppy.\n\n Me('PiggyInu'): How are you?\n Puppy: I'm fine. Thanks for asking\n Me('PiggyInu'): You're welcome. How's your day going\n Puppy: Monday Blues for me. How about you? \n Me('PiggyInu'): I'm good. Just enjoying the day. \n Puppy: Who is the prime minister of Singapore? \n Me('PiggyInu'):",
      temperature: 0.7,
      max_tokens: 100,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      stop: "\n",
    });

    console.log(response.data.choices);
  } catch (error) {
    console.log(error);
  }
})();
