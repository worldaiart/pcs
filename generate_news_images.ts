import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generateImages() {
  const prompts = [
    {
      id: 'news-1',
      prompt: "A professional business seminar in a large hotel ballroom in Korea. There are about 16 round tables covered with blue circular tablecloths. People are sitting at the tables listening to a presentation. Realistic, high-quality photography, wide angle view."
    },
    {
      id: 'news-2',
      prompt: "A large formal forum or conference taking place in a grand auditorium or meeting room, specifically resembling a National Assembly (국회의사당) meeting room in Korea. A speaker is at a podium on a stage with a large blue backdrop banner. The audience is seated in rows of red theater-style seats. Realistic, professional event photography."
    },
    {
      id: 'news-3',
      prompt: "A corporate workshop or training session in a modern hotel event hall or conference room in Korea. Participants are seated at long tables with black tablecloths, looking towards a presentation screen at the front. Realistic, high-quality office environment photography."
    }
  ];

  const results = [];

  for (const item of prompts) {
    console.log(`Generating image for ${item.id}...`);
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: item.prompt }],
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9",
        },
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        results.push({
          id: item.id,
          url: `data:image/png;base64,${part.inlineData.data}`
        });
        break;
      }
    }
  }

  return results;
}

generateImages().then(images => {
  console.log('Generated Images:');
  images.forEach(img => {
    console.log(`ID: ${img.id}`);
    console.log(`URL: ${img.url.substring(0, 100)}...`);
  });
}).catch(err => {
  console.error('Error generating images:', err);
});
