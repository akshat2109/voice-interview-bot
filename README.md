# Voice Interview Bot

A small web app that answers interview-style questions ("What's your life story?",
"What's your #1 superpower?", etc.) the way Akshat Mishra would answer them — by voice.

No backend, no API keys, no build step. It runs entirely in the browser using the
Web Speech API (speech-to-text for your question, text-to-speech for the answer).

## Try it locally

Just open `index.html` in a browser (Chrome or Edge recommended for voice input).
No install, no server needed.

## Edit the answers

All of the bot's knowledge lives in `data.js`. Each entry has a `question`, a list
of `keywords` used to match free-form questions, and the `answer` text that gets
spoken and displayed. Edit the `answer` strings to change what the bot says.

## Deploy it so anyone can test it (no coding required)

**Step 1 — Put the code on GitHub**
1. Go to https://github.com/new, create a repo (e.g. `voice-interview-bot`), keep it empty (no README).
2. In this folder, run:
   ```
   git remote add origin <the URL GitHub gives you>
   git branch -M main
   git push -u origin main
   ```

**Step 2 — Deploy on Vercel (free, ~1 minute, no CLI needed)**
1. Go to https://vercel.com/new and sign in with your GitHub account.
2. Click "Import" next to the `voice-interview-bot` repo.
3. Leave all settings as default (it's a static site, nothing to configure) and click **Deploy**.
4. Vercel gives you a public URL like `https://voice-interview-bot.vercel.app` — that's your submission link.

Any future edits: just `git push` again and Vercel redeploys automatically.

### Alternative: Netlify Drop (even faster, no git required)

Go to https://app.netlify.com/drop and drag this whole folder onto the page. It
gives you a live public URL in seconds — good for a quick submission, though it
won't auto-update when you edit files (you'd re-drag the folder).

## Browser support

- Chrome / Edge (desktop & Android): full experience — tap the mic and talk.
- Safari / Firefox / iOS: voice *output* (spoken answers) works everywhere; voice
  *input* isn't supported by those browsers, so visitors can type a question or
  tap one of the suggested-question chips instead. The app detects this
  automatically and shows a small notice.
