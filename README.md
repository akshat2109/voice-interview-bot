# Voice Interview Bot

A small web app that answers interview-style questions ("What's your life story?",
"What's your #1 superpower?", etc.) the way Akshat Mishra would answer them — by voice.

Speech-to-text and text-to-speech run entirely in the browser via the Web Speech
API (free, no key). Generating the actual answer is a live call to the
**Anthropic Claude API** (`claude-haiku-5-5`), so it understands rephrased or
unexpected questions, not just a fixed script, and gives a genuinely different
answer each time you ask. If that call ever fails (no network, quota exhausted,
key not set), the bot falls back to a small set of offline pre-written answers
in `data.js` so it never goes silent.

## Architecture

```
[mic/typed question] → POST /api/ask → Vercel serverless function
                                          → Anthropic API (server-side key)
                                        ← generated answer
← spoken via the browser's SpeechSynthesis
```

The Anthropic API key lives only in a Vercel environment variable, read by
`api/ask.js` on the server. It is never sent to the browser and nobody testing
the bot ever sees or enters it.

## Edit what the bot knows about you

`data.js`:
- `FACTS` — the raw background facts the live model draws on when answering.
  Add, edit, or remove facts here; keep each one true and specific.
- `QA` — the suggested-question chips shown in the UI, plus a couple of
  pre-written `answers` per question used only as the offline fallback if the
  API call fails.

The actual behavior/tone rules (natural phrasing, Java-vs-AI framing, never
saying no on fit, frontend mentioned only if asked, etc.) live in the system
prompt built in `api/ask.js`.

## Run it locally

Requires Node.js and the Vercel CLI (`npm install -g vercel`), since `index.html`
alone can't run the serverless function.

```
npm install
vercel dev
```

Set `ANTHROPIC_API_KEY` in a local `.env` file (not committed) or export it in
your shell before running `vercel dev`.

Opening `index.html` directly (or a plain static file server) still works for
UI testing, but `/api/ask` won't exist, so every question will use the offline
fallback answers instead of the live model.

## Deploying (GitHub + Vercel)

This repo is already pushed to GitHub and imported into Vercel. To finish
setup or redeploy elsewhere:

**1. Push code** — already done via:
```
git push
```
Any future `git push` to `main` redeploys automatically once step 2 is done.

**2. Set the API key in Vercel (one-time, required)**
1. Go to your project on https://vercel.com/dashboard → **Settings** → **Environment Variables**.
2. Add a variable named `ANTHROPIC_API_KEY` with your Anthropic API key as the value (get one at https://console.anthropic.com).
3. Redeploy (Vercel → Deployments → ⋯ → Redeploy) so the function picks it up.

Nobody testing the bot needs this key — it's set once, by you, in Vercel's
dashboard, and used only server-side.

## Browser support

- Chrome / Edge (desktop & Android): full experience — tap the mic and talk.
- Safari / Firefox / iOS: voice *output* (spoken answers) works everywhere; voice
  *input* isn't supported by those browsers, so visitors can type a question or
  tap one of the suggested-question chips instead. The app detects this
  automatically and shows a small notice.
