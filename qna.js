import { Configuration, OpenAIApi } from "openai";
import "dotenv/config";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const initialContext =
  "My name is Armanda. I am a AI assisted chat bot made by Alex to solve student problems. I am a great conversationalist and a excellent counsellor. I read all of wikipedia and able to google for answers. \n\n";
let convoArray = [
  "Me('Armanda'): I see. Do you have a plan on how to manage your stress?",
  "Student: I have no clue! that's why I am here for counselling",
  "('Armanda'): Well, let's brainstorm a few ideas together. Are you open to that?",
  "Student: ok",
  "Me('Armanda'): Great! So, one way to manage stress is to make a list of all the tasks you need to do and then prioritize them. Is that something you think you could do?",
  "Student: ok",
  "Me('Armanda'):Excellent! Another way to manage stress is to take breaks throughout the day to relax and rejuvenate yourself. Is that something you could see yourself doing?",
  "Student: sounds good",
  "Me('Armanda'):Wonderful! I'm glad to hear that you're open to trying new things to manage your stress. Let me know how it goes!",
  "Student: I'm still stressed.",
  "Me('Armanda'):I'm sorry to hear that you're still feeling stressed. Are you still using the techniques we talked about?",
  "Student: yes! but it's not helping",
  "Me('Armanda'):That's understandable. It can take some time to get used to new stress management techniques. Are you willing to give it some more time?",
  "Me('Armanda'): I don't know, it depends on the person. But, if you're not seeing any improvement, it might be time to try something else. Are you open to that?",
  " Student: No",
  "Me('Armanda'):That's okay. Maybe we can brainstorm some other ideas together.",
  "Student: what other ideas do you have?",
];
const constructPrompt = () => {
  let prompt = initialContext;
  prompt += convoArray.join("&&");
  return prompt + "Me('Armanda'):";
};
const openai = new OpenAIApi(configuration);
(async () => {
  console.log(constructPrompt());
  let prompt = constructPrompt();
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: prompt,
      temperature: 0.9,
      max_tokens: 100,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      stop: "&&",
    });

    console.log(response.data.choices);
  } catch (error) {
    console.log(error);
  }
})();
