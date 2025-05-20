export async function generateTasks(topic: string): Promise<string[]> {
  const prompt = `You are an AI tutor. Give me 5 unique, simple, and practical tasks to learn about "${topic}". Just return the tasks in plain text, each on a new line.`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.8,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 256,
          stopSequences: [],
        },
      }),
    }
  );

  const json = await response.json();
  console.log("Gemini raw JSON:", json);

  const rawText = json.candidates?.[0]?.content?.parts?.[0]?.text || "";
  console.log("Raw text from Gemini:", rawText);

  if (!rawText) {
    return ["Watch a Python crash course", "Learn variables and data types", "Practice basic functions", "Build a calculator", "Read Python docs"];
  }

  return rawText
    .split(/[\n•-]/)
    .map((line: string) => line.trim())
    .filter(Boolean);
}