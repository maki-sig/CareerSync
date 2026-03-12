import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

export const runtime = 'edge';

function isQuotaError(err: unknown): boolean {
    const message = err instanceof Error ? err.message : String(err)
    const asAny = err as any

    return (
        asAny?.status === 429 ||
        asAny?.statusCode === 429 ||
        asAny?.code === 'RESOURCE_EXHAUSTED' ||
        message.toLowerCase().includes('quota') ||
        message.toLowerCase().includes('resource_exhausted') ||
        message.toLowerCase().includes('rate limit') ||
        message.toLowerCase().includes('too many requests')
    )
}

export async function POST(req: Request) {
    try {
        const { prompt } = await req.json();

        const { text } = await generateText({
            model: google('gemini-2.5-flash'),
            system: `Act as an IT and CS career advisor. When given a student profile, respond ONLY with a valid JSON object (no markdown, no prose).
JSON Structure:
{
  "role": "a or an + Specific job title",
  "summary": "1-sentence role description",
  "fitReason": "1-sentence connecting profile to role",
  "confidence": 0-100
}`,
            prompt,
        });

        const clean = text.replace(/```json|```/g, '').trim();

        return new Response(clean, {
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (err) {
        const message = err instanceof Error ? err.message : String(err)
        console.error('[/api/chat] Error:', message)

        if (isQuotaError(err)) {
            return new Response(
                JSON.stringify({ error: 'quota_exceeded', message }),
                {
                    status: 429,
                    headers: {
                        'Content-Type': 'application/json',
                        'Retry-After': '60',
                    },
                }
            )
        }

        return new Response(
            JSON.stringify({ error: 'api_error', message }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        )
    }
}