import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const { text } = await generateText({
      model: google('gemini-2.0-flash'),  // ← updated model name
      system: `You are a career advisor for IT and Computer Science students.
When given a student's profile, you respond ONLY with a valid JSON object — no markdown, no backticks, no explanation.
The JSON must follow this exact structure:
{
  "role": "string (a specific job title, e.g. 'Cybersecurity Analyst', 'Machine Learning Engineer')",
  "summary": "string (2-3 sentences describing this type of professional and what they do)",
  "fitReason": "string (2-3 sentences directly connecting the student's work style, subjects, strengths, and hobbies to this role)",
  "confidence": number (0-100, how strongly their profile matches this career)
}
Output nothing except the JSON object.`,
      prompt,
    });

    const clean = text.replace(/```json|```/g, '').trim();

    return new Response(clean, {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[/api/chat] Error:', message)
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}