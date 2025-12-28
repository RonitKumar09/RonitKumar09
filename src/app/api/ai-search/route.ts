import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Types
type AIIntent = 'experience' | 'projects' | 'contact' | 'about' | 'home';

export async function POST(request: Request) {
  try {
    const { query } = await request.json();

    if (!query) {
      return NextResponse.json({ error: 'Query required' }, { status: 400 });
    }

    // Determine Provider
    const provider = process.env.AI_PROVIDER || (process.env.OPENAI_API_KEY ? 'openai' : 'gemini');

    let result = { intent: 'home', confidence: 0, reasoning: 'Default fallback' };

    if (provider === 'openai' && process.env.OPENAI_API_KEY) {
      result = await searchOpenAI(query);
    } else if (process.env.GOOGLE_GENERATIVE_AI_KEY) {
      result = await searchGemini(query);
    } else {
      // No provider configured
      console.warn("No AI provider configured");
      return NextResponse.json({ 
        intent: 'home', 
        confidence: 0, 
        reasoning: 'No AI provider configured, defaulting to home' 
      });
    }

    return NextResponse.json(result);

  } catch (error) {
    console.error("AI Search Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

const SYSTEM_PROMPT = `
You are a portfolio navigation assistant for Ronit Kumar, a Full Stack Developer.
Analyze the user's search query and determine which page they most likely want to visit.
Available pages:
- 'experience': Work history, jobs, internships, timeline
- 'projects': Code, github, case studies, specific project names (DC-Web, OI-Admin, etc.)
- 'contact': Email, social links, get in touch
- 'about': Bio, skills, education, location
- 'home': Landing page, start over

Return ONLY a JSON object:
{
  "intent": "experience" | "projects" | "contact" | "about" | "home",
  "confidence": number (0-1),
  "reasoning": "short explanation"
}
`;

async function searchOpenAI(query: string) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  
  const completion = await openai.chat.completions.create({
    model: "gpt-4-turbo", // or gpt-3.5-turbo if preferred for speed
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: query }
    ],
    response_format: { type: "json_object" }
  });

  const content = completion.choices[0].message.content;
  if (!content) throw new Error("Empty response from OpenAI");
  
  return JSON.parse(content);
}

async function searchGemini(query: string) {
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_KEY!);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash", generationConfig: { responseMimeType: "application/json" } });

  const result = await model.generateContent(`${SYSTEM_PROMPT}\n\nUser Query: ${query}`);
  const text = result.response.text();
  
  return JSON.parse(text);
}
