import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API
const fetchGeminiResponse = async (prompt) => {
  try {
    const genAI = new GoogleGenerativeAI("AIzaSyDbABE8XQroTAPNxhl_sEJ9IG2rRAgu_jk");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const result = await model.generateContent([
      `Please provide a brief solution to this academic doubt in two hundred words only: ${prompt}`
    ]);

    const text = await result.response.text();
    console.log("Generated content:", text);
    return text;
  } catch (error) {
    console.error("Error fetching AI response:", error);
    throw error;
  }
};

// Example usage
(async () => {
  const prompt = "What is the theory of relativity?";
  const response = await fetchGeminiResponse(prompt);
  console.log("AI Response:", response);
})();
