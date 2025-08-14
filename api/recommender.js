// api/recommend.js (Vercel Serverless Function)
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { protein, budget, diet, allergies, foodData } = req.body;

  // Filter out allergens
  const safeFoods = foodData.filter(item =>
    !allergies.some(allergen =>
      item.name.toLowerCase().includes(allergen.toLowerCase())
    )
  );

  // Create prompt
  const userPrompt = `
Goal: ${protein}g protein, max ${budget} kr/day, ${diet} diet.
Allergies: ${allergies.join(", ") || "none"}.
Available foods (name, protein/100g, price, volume): 
${safeFoods.map(f => `${f.name} (${f.protein}g protein, ${f.price} kr, ${f.volume})`).join("\n")}

Generate a meal plan with 2 meals + 1 snack. Prioritize protein per krona.
`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are WillysNutriAI. Follow these rules: ${systemPrompt}` // Paste the system prompt here (truncated for brevity)
        },
        {
          role: "user",
          content: userPrompt
        }
      ],
      temperature: 0.2,
      max_tokens: 500,
    });

    res.status(200).json({ plan: completion.choices[0].message.content });
  } catch (error) {
    console.error("OpenAI Error:", error);
    res.status(500).json({ error: "AI temporarily unavailable" });
  }
}