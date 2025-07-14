import axios from "axios";

const response = await axios.post(
  "https://api.openai.com/v1/chat/completions",
  {
    model: "gpt-4",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: "Hello!" }
    ]
  },
  {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
    }
  }
);

console.log(response.data.choices[0].message.content);
