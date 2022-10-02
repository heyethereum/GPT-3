import "./App.css";
import React, { useState, useEffect } from "react";
import { Configuration, OpenAIApi } from "openai";

function App() {
  const chatListRef = React.useRef();
  const [input, setInput] = useState("");
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [convoArray, setConvoArray] = useState([
    {
      name: "Me('Armanda')",
      msg: "Hello! My name is Armanda. How can I help you?",
    },
  ]);

  useEffect(() => {
    const queryAI = async (prompt) => {
      const configuration = new Configuration({
        apiKey: process.env.REACT_APP_OPENAI_API_KEY,
      });
      const openai = new OpenAIApi(configuration);
      try {
        const response = await openai.createCompletion({
          model: "text-davinci-002",
          prompt: prompt,
          temperature: 0.7,
          max_tokens: 100,
          top_p: 1,
          frequency_penalty: 0.0,
          presence_penalty: 0.0,
          stop: "&&",
        });
        const botReply = response.data.choices;
        console.log("before queryAi", convoArray);
        console.log("botReply:", botReply);
        const formattedReply = botReply[0].text
          .trim()
          .replaceAll("\\n", "... ");
        console.log(formattedReply);
        setConvoArray((c) => {
          return [
            ...c,
            {
              name: "Me('Armanda')",
              msg: formattedReply,
            },
          ];
        });
        console.log("after queryAi", convoArray);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
      console.log();
    };
    if (prompt !== "") {
      console.log(convoArray);
      queryAI(prompt);
      chatListRef.current.scrollIntoView({ behaviour: "smooth" });
    }
  }, [prompt]);

  const addMessage = (e) => {
    e.preventDefault();
    if (!input) return;
    setLoading(true);
    setConvoArray((c) => {
      console.log("convoArray", c);
      return [...c, { name: "Student", msg: input }];
    });
    setInput("");
    const messageList = [...convoArray, { name: "Student", msg: input }];
    console.log(constructPrompt(messageList));
    setPrompt(constructPrompt(messageList));
  };

  const initialContext =
    "My name is Armanda. I am a AI assisted chat bot made by Alex to solve student problems. I am a great conversationalist and a excellent counsellor and humorous most of the time. I read all of wikipedia and able to google for answers. \n\nMe('Armanda'): Hello! My name is Armanda. How can I help you? && Student: I'm stressed && ('Armanda'): I'm sorry to hear that you're feeling stressed. Can you tell me more about what's causing your stress? && Student: I have no clue! that's why I am here for counselling && ('Armanda'): Well, let's brainstorm a few ideas together. Are you open to that? && Student: ok && Me('Armanda'): Great! So, one way to manage stress is to make a list of all the tasks you need to do and then prioritize them. Is that something you think you could do? && Student: ok && Me('Armanda'):Excellent! Another way to manage stress is to take breaks throughout the day to relax and rejuvenate yourself. Is that something you could see yourself doing? && Student: sounds good && Me('Armanda'):Wonderful! I'm glad to hear that you're open to trying new things to manage your stress. Let me know how it goes! && Student: I'm still stressed. && Me('Armanda'):I'm sorry to hear that you're still feeling stressed. Are you still using the techniques we talked about? && Student: yes! but it's not helping && Me('Armanda'):That's understandable. It can take some time to get used to new stress management techniques. Are you willing to give it some more time? && Student: ok && Me('Armanda'): I don't know, it depends on the person. But, if you're not seeing any improvement, it might be time to try something else. Are you open to that? && Student: ok && Me('Armanda'):";

  const constructPrompt = (messageList) => {
    let prompt = initialContext;
    prompt += messageList
      .map((message) => {
        const { name, msg } = message;
        return `${name}: ${msg}`;
      })
      .join("&&");
    return prompt + "&&Me('Armanda'):";
  };

  return (
    <div className="container">
      <div>
        <h1>AI Powered Chatbot</h1>
      </div>
      <div id="messageList">
        {convoArray?.map((message, index) => {
          let { name, msg } = message;
          name = name === "Student" ? "You" : "Armanda";
          return (
            <div
              key={index}
              className={name === "You" ? "message" : "chatbot message"}
            >
              <strong>{name}: </strong> {msg.replaceAll("\\n", "")}
            </div>
          );
        })}
        <div>
          {loading ? (
            <>
              <strong className="chatbot">Armanda: </strong>
              <span className="typing">typing....</span>
            </>
          ) : (
            <>
              <strong>You: </strong>
              <span className="typing">{input}</span>
            </>
          )}
        </div>
        <div ref={chatListRef}></div>
      </div>
      <div>
        <input
          type="text"
          id="chatMessage"
          onChange={(e) => setInput(e.target.value)}
          value={input}
          disabled={loading ? true : false}
          placeholder="Message"
        ></input>
      </div>
      <div>
        <input
          type="button"
          id="sendBtn"
          value="Send"
          onClick={addMessage}
          placeholder="Message"
        />
      </div>
    </div>
  );
}

export default App;
