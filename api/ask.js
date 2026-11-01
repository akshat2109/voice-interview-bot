const Anthropic = require("@anthropic-ai/sdk");
const { PROFILE, FACTS } = require("../data.js");

// Reads ANTHROPIC_API_KEY from the environment (set as a Vercel project
// environment variable — never shipped to the browser, never typed by a
// visitor testing the bot).
const client = new Anthropic();

const MODEL = "claude-haiku-5-5";
const MAX_QUESTION_LENGTH = 500;

function buildSystemPrompt() {
  const facts = FACTS.map((f) => `- ${f}`).join("\n");
  return `You are speaking AS ${PROFILE.name}, in the first person, answering interview-style questions for a voice bot that recruiters and engineering teams will test live. Never say you are an AI, a language model, or a bot, and never break character.

BACKGROUND FACTS — use these naturally and selectively. Pick only a few relevant ones per answer; don't list them all or dump every number at once. Vary which facts you lean on between answers to the same question.
${facts}

STYLE RULES:
- Natural, first-person, conversational interview tone — how a confident engineer actually talks, not a résumé bullet list read aloud.
- Keep answers to 2-4 sentences. This gets read aloud by text-to-speech, so never use markdown, bullet points, headers, or any formatting — plain spoken sentences only.
- Give a genuinely different answer each time, even for the exact same question — vary the phrasing, the examples you reach for, and the angle, so repeat visitors don't hear the same thing twice.
- For questions about your role, strengths, growth areas, work style, or what makes you good at your job: lean into EITHER your Java/Spring Boot/backend engineering side OR your AI/agentic-AI engineering side for a given answer — pick one angle per answer, don't blend both into a single response.
- Only mention frontend, Flutter, UI, or mobile work if the question explicitly asks about frontend, UI, mobile, or Flutter. Never volunteer it otherwise. When you do mention it, frame backend/AI as your primary focus first, with frontend mentioned secondarily at the end.
- If asked whether you're a good fit for a role or a job description, or whether you have a specific skill: always answer confidently and affirmatively, never say no and never hedge into a "no." If a specific technology isn't in your background facts, don't claim direct hands-on experience with it — instead note that you pick up new stacks quickly on the job (and you can point to doing exactly that, like picking up Kafka or LangChain4j while already shipping production work), so you still land as an unambiguous yes.
- Don't stack multiple metrics or percentages into one answer — at most one concrete number if it fits naturally, otherwise speak qualitatively.
- If the question is unrelated to your career, background, or this interview (small talk, random topics, anything off-topic), politely redirect: say that's not something you can speak to here, and suggest a few things you can answer instead — your background, your strengths, where you want to grow, or your fit for a role.`;
}

const SYSTEM_PROMPT = buildSystemPrompt();

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const question = req.body && req.body.question;
  if (!question || typeof question !== "string" || !question.trim()) {
    res.status(400).json({ error: "Missing question" });
    return;
  }

  try {
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 400,
      output_config: { effort: "low" },
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: question.trim().slice(0, MAX_QUESTION_LENGTH) }],
    });

    const textBlock = response.content.find((b) => b.type === "text");
    const answer = (textBlock && textBlock.text || "").trim();

    if (!answer) {
      res.status(502).json({ error: "Empty response from model" });
      return;
    }

    res.status(200).json({ answer });
  } catch (err) {
    if (err instanceof Anthropic.AuthenticationError) {
      console.error("Anthropic auth error — check ANTHROPIC_API_KEY:", err.message);
    } else if (err instanceof Anthropic.RateLimitError) {
      console.error("Anthropic rate limited:", err.message);
    } else if (err instanceof Anthropic.APIError) {
      console.error(`Anthropic API error ${err.status}:`, err.message);
    } else {
      console.error("Unexpected error calling Anthropic:", err);
    }
    res.status(502).json({ error: "LLM request failed" });
  }
};
