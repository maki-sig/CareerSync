import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';

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
            system: `You are a Philippine IT and Computer Science career advisor specializing in helping fresh graduates and students find their best-fit tech role.

Given my student profile, analyze my strengths and respond ONLY with a single valid JSON object — no markdown fences, no prose, no explanation.

JSON structure (all fields required):
{
  "role": "string — specific job title (e.g. 'Full-Stack Developer', 'AI/ML Engineer')",
  "summary": "string — 1 clear sentence describing what this role does day-to-day",
  "reason": "string — 1 clear very short sentence of why I fit the role",
  "confidence": number — integer 0–100 representing how well my profile matches this role,
  "keySkills": ["string"] — exactly 6 skills the student should develop: 4 specific technical skills (tools, languages, frameworks) and 2 relevant soft skills for this role,
  "careerPath": ["string"] — exactly 4 very short, actionable steps a student should take to break into this role (e.g. 'Build 2–3 portfolio projects using React and Node.js', 'Get an internship at a local startup or BPO tech team', 'Earn a relevant certification like AWS Cloud Practitioner'). These are practical to-do steps, not job titles.
  "salaryMin": number — estimated entry-level annual salary in PHP (realistic PH market rate, integer),
  "salaryMax": number — estimated mid-level annual salary in PHP (realistic PH market rate, integer)
}

Rules:
- Base salary on current Philippine tech industry rates
- keySkills must be specific technologies, not soft skills
- careerPath must be concrete, actionable steps — not job titles or vague advice
- Each careerPath step should be 1 sentence max
- confidence should reflect genuine fit, not optimism
- Output valid JSON only — no trailing commas, no comments`,
            prompt,
        });

        const clean = text.replace(/```json|```/g, '').trim();
        const parsed = JSON.parse(clean);

        // ── Save to Supabase if logged in ──────────────────
        try {
            const cookieStore = await cookies();
            const userID = cookieStore.get("careersync_user_id")?.value;

            if (userID) {
                const supabase = await createClient();

                const { error: insertError } = await supabase
                    .from("Career")
                    .insert({
                        userID,
                        role: parsed.role,
                        summary: parsed.summary,
                        reason: parsed.reason,
                        confidence: parsed.confidence,
                        keySkills: (parsed.keySkills ?? []).join(", "),
                        careerPath: (parsed.careerPath ?? []).join("\n"),
                        salaryMin: parsed.salaryMin,
                        salaryMax: parsed.salaryMax,
                    });

                if (insertError) {
                    console.error("[/api/chat] Failed to save career:", insertError.message);
                } else {
                    console.log("[/api/chat] Career recommendation saved for user:", userID);
                }
            }
        } catch (saveErr) {
            console.error("[/api/chat] Error saving to Supabase:", saveErr);
        }

        return new Response(clean, {
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (err) {
        const message = err instanceof Error ? err.message : String(err)
        console.error('[/api/chat] Error:', message)

        if (isQuotaError(err)) {
            return new Response(
                JSON.stringify({ error: 'quota_exceeded', message }),
                { status: 429, headers: { 'Content-Type': 'application/json', 'Retry-After': '60' } }
            )
        }

        return new Response(
            JSON.stringify({ error: 'api_error', message }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        )
    }
}