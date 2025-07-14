const axios = require("axios");

exports.sendMessage = async (req, res) => {
  try {
    const { message, sessionId } = req.body;

    if (!message || !sessionId) {
      return res.status(400).json({ error: "Message and sessionId are required." });
    }

    const response = await axios.post(
      process.env.OPENAI_API_URL,
      {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful AI assistant." },
          { role: "user", content: message }
        ],
        temperature: 0.7,
        max_tokens: 500
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
        }
      }
    );

    const aiReply = response.data.choices[0].message.content;

    res.json({
      success: true,
      reply: aiReply,
      sessionId,
    });

  } catch (error) {
    console.error("OpenAI error:", error?.response?.data || error.message);
    res.status(500).json({
      error: "Failed to get response from OpenAI.",
      details: error?.response?.data || error.message
    });
  }
};
