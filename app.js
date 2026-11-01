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
  const voiceSelect = document.getElementById("voice-select");

  let muted = false;
  let voices = [];
  let chosenVoice = null;

  document.getElementById("bot-name").textContent = PROFILE.name + " — Voice Bot";
  document.getElementById("bot-tagline").textContent = PROFILE.tagline;

  // ---------- setup suggested question chips ----------
  QA.filter((item) => !item.hideFromSuggestions).forEach((item) => {
    const chip = document.createElement("button");
    chip.className = "chip";
    chip.type = "button";
    chip.textContent = item.question;
    chip.addEventListener("click", () => handleQuestion(item.question));
    suggestionsEl.appendChild(chip);
  });

  // ---------- matching ----------
  function normalize(str) {
    return str.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
  }

  function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function hasKeyword(norm, kw) {
    const kwNorm = normalize(kw);
    if (!kwNorm) return false;
    return new RegExp("\\b" + escapeRegExp(kwNorm) + "\\b").test(norm);
  }

  function bestMatch(rawQuestion) {
    const norm = normalize(rawQuestion);
    let best = null;
    let bestScore = 0;
    for (const item of QA) {
      let score = 0;
      if (normalize(item.question) === norm) score += 5;
      for (const kw of item.keywords) {
        if (hasKeyword(norm, kw)) score += 2;
      }
      if (score > bestScore) {
        bestScore = score;
        best = item;
      }
    }
    return bestScore >= 2 ? best : null;
  }

  // ---------- answer variation ----------
  const lastAnswerIndex = {};

  function pickAnswer(list, key) {
    if (list.length === 1) return list[0];
    let idx = Math.floor(Math.random() * list.length);
    if (list.length > 1 && idx === lastAnswerIndex[key]) {
      idx = (idx + 1) % list.length;
    }
    lastAnswerIndex[key] = idx;
    return list[idx];
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
    return bubble;
  }

  function addTypingBubble() {
    const bubble = addBubble("bot", "");
    bubble.classList.add("typing");
    bubble.innerHTML = '<span class="dot"></span><span class="dot"></span><span class="dot"></span>';
    return bubble;
  }

  // ---------- speech synthesis ----------
  // Preferred-by-name list of voices that tend to sound clear and light rather
  // than deep/heavy, roughly in priority order across common platforms.
  const PREFERRED_VOICE_NAMES = [
    "samantha", "google us english", "microsoft aria", "microsoft jenny",
    "zira", "victoria", "moira", "karen", "tessa", "google uk english female",
    "fiona", "veena", "female",
  ];

  function voiceScore(v) {
    const name = v.name.toLowerCase();
    const isEnglish = /^en/.test(v.lang);
    let score = isEnglish ? 1 : 0;
    const prefIndex = PREFERRED_VOICE_NAMES.findIndex((p) => name.includes(p));
    if (prefIndex !== -1) score += (PREFERRED_VOICE_NAMES.length - prefIndex) * 10;
    return score;
  }

  function savedVoiceName() {
    try {
      return localStorage.getItem("voicebot_voice_name");
    } catch (e) {
      return null;
    }
  }

  function saveVoiceName(name) {
    try {
      localStorage.setItem("voicebot_voice_name", name);
    } catch (e) {
      // ignore
    }
  }

  function populateVoiceSelect() {
    if (!voiceSelect) return;
    const prevValue = voiceSelect.value;
    const englishVoices = voices.filter((v) => /^en/.test(v.lang));
    const listedVoices = (englishVoices.length ? englishVoices : voices)
      .slice()
      .sort((a, b) => voiceScore(b) - voiceScore(a));
    voiceSelect.innerHTML = "";
    listedVoices.forEach((v) => {
      const opt = document.createElement("option");
      opt.value = v.name;
      opt.textContent = v.name + (v.lang ? " (" + v.lang + ")" : "");
      voiceSelect.appendChild(opt);
    });
    const remembered = savedVoiceName();
    const target = remembered && listedVoices.some((v) => v.name === remembered)
      ? remembered
      : (chosenVoice ? chosenVoice.name : prevValue);
    if (target) voiceSelect.value = target;
  }

  function loadVoices() {
    voices = window.speechSynthesis ? window.speechSynthesis.getVoices() : [];
    if (!voices.length) return;
    const remembered = savedVoiceName();
    chosenVoice =
      (remembered && voices.find((v) => v.name === remembered)) ||
      voices.slice().sort((a, b) => voiceScore(b) - voiceScore(a))[0] ||
      null;
    populateVoiceSelect();
  }

  if (window.speechSynthesis) {
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }

  if (voiceSelect) {
    voiceSelect.addEventListener("change", () => {
      const picked = voices.find((v) => v.name === voiceSelect.value);
      if (picked) {
        chosenVoice = picked;
        saveVoiceName(picked.name);
        speak("Hi, this is how I sound now.");
      }
    });
  }

  function speak(text) {
    if (muted || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    if (chosenVoice) utter.voice = chosenVoice;
    utter.rate = 1;
    utter.pitch = 1.05;
    utter.onstart = () => avatarEl.classList.add("speaking");
    utter.onend = () => avatarEl.classList.remove("speaking");
    utter.onerror = () => avatarEl.classList.remove("speaking");
    window.speechSynthesis.speak(utter);
  }

  // ---------- offline fallback (used only if the live API call fails) ----------
  function offlineAnswer(text) {
    const match = bestMatch(text);
    return match ? pickAnswer(match.answers, match.id) : pickAnswer(FALLBACK_ANSWERS, "__fallback__");
  }

  async function askLLM(text) {
    const response = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: text }),
    });
    if (!response.ok) throw new Error("API error " + response.status);
    const data = await response.json();
    if (!data.answer) throw new Error("Empty answer");
    return data.answer;
  }

  // ---------- main handler ----------
  async function handleQuestion(questionText) {
    const text = questionText.trim();
    if (!text) return;
    addBubble("user", text);
    inputEl.value = "";
    const typingBubble = addTypingBubble();

    let answer;
    try {
      answer = await askLLM(text);
    } catch (e) {
      answer = offlineAnswer(text);
    }

    typingBubble.remove();
    addBubble("bot", answer);
    speak(answer);
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
    if (voiceSelect) voiceSelect.disabled = true;
    const n = voiceNotice.textContent ? voiceNotice.textContent + " " : "";
    voiceNotice.textContent = n + "Spoken answers aren't supported in this browser — answers will still appear as text.";
    voiceNotice.style.display = "block";
  }

  // welcome message
  addBubble("bot", "Hi, I'm " + PROFILE.name + ". Tap a question below, type one, or press the mic and ask me anything from the interview guide.");
})();
