import { GoogleGenAI } from "@google/genai";

async function generateLogo() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          text: 'A high-quality, professional, abstract circular logo for a regional industrial technology cooperative. The logo features three interlocking human-like figures in dark blue, light blue, and orange, arranged in a circle. The design is clean, modern, and minimalist, on a transparent background. Vector style.',
        },
      ],
    },
    config: {
      imageConfig: {
        aspectRatio: "1:1",
      },
    },
  });

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      const base64EncodeString = part.inlineData.data;
      const imageUrl = `data:image/png;base64,${base64EncodeString}`;
      // I'll save this to a file or use it in the app.
      // Since I can't easily "save" an image file from here, I'll use it in the code.
      // Actually, I can't run this code here. I need to write it in the app.
    }
  }
}
