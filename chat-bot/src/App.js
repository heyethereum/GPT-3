import "./App.css";
import React, { useState, useEffect } from "react";
import { Configuration, OpenAIApi } from "openai";

function App() {
  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
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
    if (prompt !== "") {
      console.log(convoArray);
      queryAI(prompt);
      chatListRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [prompt]);

  const queryAI = async (prompt) => {
    try {
      const response = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: prompt,
        temperature: 0.75,
        max_tokens: 100,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        stop: "\n",
      });
      const botReply = response.data.choices;
      console.log("before queryAi", convoArray);
      console.log("botReply:", botReply);
      const formattedReply = botReply[0].text.trim().replace("\\n", "");
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
      chatListRef.current.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      console.log(error);
    }
    console.log();
  };
  const addMessage = async (e) => {
    /* e.preventDefault(); */
    if (!input) return;
    setLoading(true);
    setConvoArray((c) => {
      console.log("convoArray", c);
      return [...c, { name: "Student", msg: input }];
    });
    setInput("");
    const messageList = [...convoArray, { name: "Student", msg: input }];
    setPrompt(constructPrompt(messageList));
  };

  const initialContext =
    "My name is Armanda. I am a AI assisted chat bot made by Alex to solve human's problems. I am a great conversationalist, an excellent counsellor and extremely humorous. I read all of Wikipedia. I do google for answers. :) \n\n";

  const constructPrompt = (messageList) => {
    let prompt = initialContext;
    prompt += messageList
      .map((message) => {
        const { name, msg } = message;
        return `${name}: ${msg}`;
      })
      .join("\\n");
    return prompt + "\\n Me('Armanda'):";
  };

  return (
    <div className="container">
      <div>
        <h1>AI Powered Chatbot</h1>
      </div>
      <div id="messageList" ref={chatListRef}>
        {convoArray?.map((message, index) => {
          let { name, msg } = message;
          name = name === "Student" ? "You" : "Armanda";
          return (
            <div
              key={index}
              className={name === "You" ? "message" : "chatbot message"}
            >
              <strong>{name}: </strong> {msg.replace("\\n", "")}
            </div>
          );
        })}

        {loading ? (
          <div>
            <strong className="chatbot">Armanda: </strong>
            <span className="typing">typing....</span>
          </div>
        ) : (
          <div>
            <strong>You: </strong>
            <span className="typing">{input}</span>
          </div>
        )}
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
