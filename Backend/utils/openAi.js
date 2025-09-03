const getOpenAiApiResponse = async (message) => {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
        "Referer": "http://localhost:8080",
        "X-Title": "MyGptApp"
      },
      body: JSON.stringify({
        model: "openai/gpt-4o",
        max_tokens: 1800,  // lowered to avoid credit issue
        messages: [
          { role: "user", content: message }
        ]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenRouter API Error:", data);
      return null;
    }

    return data.choices?.[0]?.message?.content ?? null;
  } catch (error) {
    console.error("Fetch error:", error.message);
    return null;
  }
};
export default getOpenAiApiResponse;