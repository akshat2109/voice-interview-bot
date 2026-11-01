(function () {
  const transcriptEl = document.getElementById("transcript");
  const inputEl = document.getElementById("text-input");
  const askBtn = document.getElementById("ask-btn");
  const micBtn = document.getElementById("mic-btn");
  const muteBtn = document.getElementById("mute-btn");
  const statusEl = document.getElementById("status");
  const avatarEl = document.getElementById("avatar");
  const suggestionsEl = document.getElementById("suggestions");
  const voiceNotice = document.getElementById("voice-notice");

  let muted = false;
  let voices = [];
  let chosenVoice = null;

  // ---------- setup suggested question chips ----------
  QA.forEach((item) => {
    const chip = document.createElement("button");
    chip.className = "chip";
    chip.type = "button";
    chip.textContent = item.question;
    chip.addEventListener("click", () => handleQuestion(item.question, item));
    suggestionsEl.appendChild(chip);
  });

  // ---------- matching ----------
  function normalize(str) {
    return str.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
  }

  function bestMatch(rawQuestion) {
    const norm = normalize(rawQuestion);
    let best = null;
    let bestScore = 0;
    for (const item of QA) {
      let score = 0;
      if (normalize(item.question) === norm) score += 5;
      for (const kw of item.keywords) {
        if (norm.includes(normalize(kw))) score += 2;
      }
      const words = norm.split(" ");
      for (const w of words) {
        if (w.length > 3 && normalize(item.question).includes(w)) score += 0.2;
      }
      if (score > bestScore) {
        bestScore = score;
        best = item;
      }
    }
    return bestScore > 0 ? best : null;
  }

  // ---------- transcript rendering ----------
  function clearEmptyState() {
    const empty = transcriptEl.querySelector(".empty-state");
    if (empty) empty.remove();
  }

  function addBubble(role, text) {
    clearEmptyState();
    const bubble = document.createElement("div");
    bubble.className = "bubble " + role;
    bubble.textContent = text;
    transcriptEl.appendChild(bubble);
    transcriptEl.scrollTop = transcriptEl.scrollHeight;
  }

  // ---------- speech synthesis ----------
  function loadVoices() {
    voices = window.speechSynthesis ? window.speechSynthesis.getVoices() : [];
    chosenVoice =
      voices.find((v) => /en-US|en_GB|en-GB/.test(v.lang) && v.localService) ||
      voices.find((v) => /^en/.test(v.lang)) ||
      voices[0] ||
      null;
  }

  if (window.speechSynthesis) {
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }

  function speak(text) {
    if (muted || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    if (chosenVoice) utter.voice = chosenVoice;
    utter.rate = 1;
    utter.pitch = 1;
    utter.onstart = () => avatarEl.classList.add("speaking");
    utter.onend = () => avatarEl.classList.remove("speaking");
    utter.onerror = () => avatarEl.classList.remove("speaking");
    window.speechSynthesis.speak(utter);
  }

  // ---------- main handler ----------
  function handleQuestion(questionText, matchedItemOverride) {
    const text = questionText.trim();
    if (!text) return;
    addBubble("user", text);
    const match = matchedItemOverride || bestMatch(text);
    const answer = match ? match.answer : FALLBACK_ANSWER;
    addBubble("bot", answer);
    speak(answer);
    inputEl.value = "";
  }

  askBtn.addEventListener("click", () => handleQuestion(inputEl.value));
  inputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleQuestion(inputEl.value);
  });

  muteBtn.addEventListener("click", () => {
    muted = !muted;
    muteBtn.textContent = muted ? "🔇" : "🔊";
    if (muted && window.speechSynthesis) window.speechSynthesis.cancel();
  });

  // ---------- speech recognition ----------
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognition = null;
  let listening = false;

  if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.continuous = false;

    recognition.onstart = () => {
      listening = true;
      micBtn.classList.add("listening");
      statusEl.textContent = "Listening…";
      statusEl.classList.add("live");
    };

    recognition.onresult = (event) => {
      let finalText = "";
      let interimText = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) finalText += transcript;
        else interimText += transcript;
      }
      inputEl.value = finalText || interimText;
      if (finalText) {
        handleQuestion(finalText);
      }
    };

    recognition.onerror = (event) => {
      statusEl.textContent = "Mic error: " + event.error + ". Try typing instead.";
      statusEl.classList.remove("live");
    };

    recognition.onend = () => {
      listening = false;
      micBtn.classList.remove("listening");
      statusEl.textContent = "";
      statusEl.classList.remove("live");
    };

    micBtn.addEventListener("click", () => {
      if (listening) {
        recognition.stop();
      } else {
        try {
          recognition.start();
        } catch (e) {
          // already started edge case
        }
      }
    });
  } else {
    micBtn.disabled = true;
    micBtn.title = "Voice input isn't supported in this browser — try typing or tapping a question, or open this page in Chrome/Edge.";
    voiceNotice.textContent =
      "This browser doesn't support voice input. Type a question or tap a suggestion below — spoken answers still work.";
    voiceNotice.style.display = "block";
  }

  if (!window.speechSynthesis) {
    muteBtn.disabled = true;
    const n = voiceNotice.textContent ? voiceNotice.textContent + " " : "";
    voiceNotice.textContent = n + "Spoken answers aren't supported in this browser — answers will still appear as text.";
    voiceNotice.style.display = "block";
  }

  // welcome message
  addBubble("bot", "Hi, I'm " + PROFILE.name + ". Tap a question below, type one, or press the mic and ask me anything from the interview guide.");
})();
