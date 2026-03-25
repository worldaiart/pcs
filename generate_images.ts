import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generateNewsImages() {
  const prompts = [
    "A professional business seminar in a large hotel ballroom in Korea. People are sitting at round tables with blue tablecloths, engaged in discussion. A large screen at the front shows a presentation. Realistic, high-quality photography.",
    "A large formal forum or conference in a grand auditorium in Korea. A speaker is at a podium on a stage with a large blue backdrop banner. The audience is seated in rows of red theater seats. Realistic, professional event photography.",
    "A corporate workshop or training session in a modern hotel event hall or conference room in Korea. Participants are seated at long black tables, looking towards a presentation screen at the front. Realistic, high-quality office environment photography."
  ];

  const images = [];

  for (const prompt of prompts) {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9",
        },
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        images.push(`data:image/png;base64,${part.inlineData.data}`);
      }
    }
  }
  
  return images;
}
