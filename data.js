// Edit this file to change what the bot knows about you.
// Each entry: id, the canonical question, keywords used for matching free-form/voice
// questions, and the answer the bot will speak + display.

const PROFILE = {
  name: "Akshat Mishra",
  tagline: "Software Engineer — ask me anything from the interview guide",
};

const QA = [
  {
    id: "life_story",
    question: "What should we know about your life story in a few sentences?",
    keywords: ["life story", "about yourself", "tell me about you", "background", "who are you", "introduce yourself"],
    answer:
      "I'm a software engineer who studied CS at IIIT Dharwad, and for the last few years I've been building the backend of a digital healthcare platform from close to zero — everything from payment processing and real-time doctor-patient messaging to an AI chatbot and the infrastructure that keeps it all running at scale. I like being the person who takes a vague problem and turns it into a working system end to end.",
  },
  {
    id: "superpower",
    question: "What's your #1 superpower?",
    keywords: ["superpower", "number one superpower", "best skill", "greatest strength", "biggest strength"],
    answer:
      "Range. I can go from designing a Kafka-based event pipeline to debugging a Flutter UI to orchestrating an LLM-powered chatbot in the same week. I don't stay boxed into one layer of the stack, so I can usually unblock a problem myself instead of waiting on a handoff.",
  },
  {
    id: "growth_areas",
    question: "What are the top 3 areas you'd like to grow in?",
    keywords: ["grow", "growth", "areas to improve", "weaknesses", "improve in", "develop"],
    answer:
      "Three things: systems design at a much larger scale than I operate at today, becoming a stronger technical communicator and mentor as the teams I work with grow, and going deeper into applied machine learning rather than just integrating it through an API.",
  },
  {
    id: "misconception",
    question: "What misconception do your coworkers have about you?",
    keywords: ["misconception", "wrong about you", "misunderstand", "coworkers think"],
    answer:
      "Because I move fast and touch a lot of systems, people sometimes assume I'm skimming the surface — but I actually go pretty deep before I ship, I just don't make a show of it.",
  },
  {
    id: "push_boundaries",
    question: "How do you push your boundaries and limits?",
    keywords: ["push your boundaries", "push limits", "challenge yourself", "step outside comfort zone", "comfort zone"],
    answer:
      "I volunteer for the parts of a project nobody owns yet — a new integration, an unfamiliar framework, a system with no existing pattern to copy. That's usually where I learn the most, even though it's uncomfortable at first.",
  },
];

const FALLBACK_ANSWER =
  "I don't have a prepared answer for that one yet. Try one of the suggested questions below, or ask me about my life story, my superpower, where I want to grow, a misconception people have about me, or how I push my limits.";
