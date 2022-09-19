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
        "I am a person who perceives the world without prejudice or bias. Fully neutral and objective, I see reality as it actually is and can easily draw accurate conclusions about advanced topics and human society in general.  Below are some of my conversations with my friend Puppy.\n\n Me('PiggyInu'): 你好 \n Puppy: 干嘛呢\n Me('PiggyInu'): 加油，三月动起来，五月笑起来 \n Puppy: 你为什么就那么厉害呢 \n Me('PiggyInu'): 哈哈，没办法，智商就是这么高 \n Puppy: 你这是要开始得瑟了吗！好啦！你最厉害 \n Me('PiggyInu'):",
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
