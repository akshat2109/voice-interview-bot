// Edit this file to change what the bot knows about you.
// Each entry: id, the canonical question, keywords used for matching free-form/voice
// questions, and a list of `answers` variants — one is picked at random each time
// (never the same one twice in a row), so asking the same question again gets a
// different angle instead of repeating itself. For the role-related questions,
// each variant leans into either the Java/backend side or the AI engineering side
// — one role at a time, not both crammed into a single answer.
// Set `hideFromSuggestions: true` to keep an entry matchable by voice/typed
// questions without showing it as a suggestion chip.

const PROFILE = {
  name: "Akshat Mishra",
  tagline: "Ask me the interview-guide questions, out loud or by typing.",
};

const QA = [
  {
    id: "life_story",
    question: "What should we know about your life story in a few sentences?",
    keywords: ["life story", "about yourself", "tell me about you", "background", "who are you", "introduce yourself"],
    answers: [
      "I'm a software engineer who studied CS at IIIT Dharwad, and for the last few years I've been building the backend of a digital healthcare platform from close to zero — Java and Spring Boot microservices, Kafka-driven messaging, payments, the works. I like being the person who takes a vague problem and turns it into a working system end to end.",
      "I'm a software engineer who's spent the last couple of years moving deeper into AI — building a RAG pipeline with LangChain4j and Claude, and an agentic chatbot on top of OpenAI's Assistants API, both for a digital healthcare platform. I came into AI engineering through the systems side rather than the research side, which I think gives me a more grounded way of actually shipping it.",
    ],
  },
  {
    id: "superpower",
    question: "What's your #1 superpower?",
    keywords: ["superpower", "number one superpower", "best skill", "greatest strength", "biggest strength"],
    answers: [
      "Range within the backend — I can go from designing a Kafka-based event pipeline to hardening an API gateway to tracking down a gnarly payments edge case, all in the same week. I don't stay boxed into one layer of the stack, so I can usually unblock a problem myself instead of waiting on a handoff.",
      "Making AI actually production-ready. A lot of people can wire up a call to an LLM; fewer have shipped the RAG pipeline and the agentic chatbot around it, with the reliability and monitoring that keeps it working when real users depend on it. That's the part I enjoy most.",
    ],
  },
  {
    id: "growth_areas",
    question: "What are the top 3 areas you'd like to grow in?",
    keywords: ["grow", "growth", "areas to improve", "weaknesses", "improve in", "develop"],
    answers: [
      "Systems design at a much larger scale than I operate at today, going broader on the infrastructure side beyond what I've already touched, and becoming a stronger technical communicator as the team around me grows.",
      "Going deeper into applied ML — right now I mostly orchestrate models like Claude and GPT, and I'd like to get closer to the model and evaluation layer itself, plus get better at explaining AI tradeoffs to people who aren't deep in it.",
    ],
  },
  {
    id: "misconception",
    question: "What misconception do your coworkers have about you?",
    keywords: ["misconception", "wrong about you", "misunderstand", "coworkers think"],
    answers: [
      "Because I move fast and touch a lot of backend systems, people sometimes assume I'm skimming the surface — but I actually go pretty deep before I ship, I just don't make a show of it.",
      "People sometimes assume the AI work I do is 'just calling an API.' In reality, getting an agentic chatbot to behave reliably in production is most of the actual engineering — the model call is the easy part.",
    ],
  },
  {
    id: "push_boundaries",
    question: "How do you push your boundaries and limits?",
    keywords: ["push your boundaries", "push limits", "challenge yourself", "step outside comfort zone", "comfort zone"],
    answers: [
      "I volunteer for the parts of a project nobody owns yet — a new integration, an unfamiliar piece of infrastructure, a system with no existing pattern to copy. That's usually where I learn the most, even though it's uncomfortable at first.",
      "I pushed myself into AI engineering before it was officially my job — learning to orchestrate LLMs and build RAG pipelines alongside my regular backend work until it turned into something real. I like picking up things nobody's handed me a playbook for.",
    ],
  },
  {
    id: "job_fit",
    question: "Are you a good fit for this role based on the job description?",
    keywords: [
      "good fit", "suitable for this role", "suitable for the job", "right fit", "why should we hire you",
      "why hire you", "are you qualified", "qualified for this position", "job description", "why you",
    ],
    answers: [
      "Yeah, I think so — if this is a Java backend role, that's basically what I do day to day: Spring Boot, Kafka, Redis, databases, third-party integrations, the whole reliability and scaling side of things. Anything in the job description that's new to me, I tend to pick up quickly once I'm actually building with it.",
      "I'd say yes — I've been doing real AI engineering, not just experimenting: RAG pipelines and agentic chatbots that run in production for actual users, on top of a solid backend. If there's something specific in the job description I haven't touched yet, that's usually just a few days of ramp-up, not a blocker.",
    ],
  },
  {
    id: "frontend_ui",
    question: "What about your frontend, Flutter, or UI experience?",
    keywords: ["frontend", "front end", "flutter", "ui", "user interface", "mobile app", "react", "dart", "mobile development"],
    hideFromSuggestions: true,
    answers: [
      "My main focus is backend and AI — that's where most of my experience is. That said, I have worked in Flutter and Dart on the mobile side too, so I'm not limited to just the backend if a project needs it.",
      "I spend most of my time on the backend and AI side, but I've also shipped real UI work in Flutter, so I can step into frontend or mobile work when it's needed — it's just not where I focus by default.",
    ],
  },
];

const FALLBACK_ANSWERS = [
  "That's not one of my prepared answers — try asking about my life story, my superpower, where I want to grow, a misconception people have about me, how I push my limits, or whether I'd be a good fit for the role.",
  "I don't have that one prepared. Try one of the suggested questions below, or ask me directly whether I'd be a good fit for a Java backend or AI engineering role.",
];

// Grounding material for the live LLM (see api/ask.js) — raw facts it can pull
// from and recombine, rather than a fixed script. Keep each one true and
// specific; the system prompt tells the model to cite only a few per answer.
const FACTS = [
  "Software Engineer at Live Your Best Life, a digital healthcare platform, since August 2023; started there as an intern in January 2023.",
  "CS degree from IIIT Dharwad (2019–2023), 8.49 CGPA.",
  "Built a RAG pipeline (InfluxDB + LangChain4j orchestrating Anthropic Claude) that extracts clinical biomarkers from wearable data, lifting user engagement ~55%.",
  "Built an agentic medical chatbot on the OpenAI Assistants API that resolves patient queries and lifted recommended supplement sales ~45%.",
  "Built an inventory service integrated with Shopify APIs/webhooks using Kafka event streaming, guaranteeing 100% data consistency across distributed services.",
  "Built a notification routing service (client factory pattern, Spring Scheduled/Cron jobs) dispatching 50K+ daily push/email/SMS alerts.",
  "Helped architect an enterprise API Gateway with Spring Cloud Gateway, centralizing routing, load balancing, and auth across millions of weekly requests.",
  "Built a real-time doctor-patient inbox messaging service with Kafka and MongoDB, processing 100K+ daily events without data loss.",
  "Built a payment gateway integrating Stripe, processing $850K+ and managing automated billing lifecycles.",
  "Built centralized access control with Spring Security and Resilience4j (rate limiting, circuit breakers), contributing to 99.99% availability.",
  "Used AWS EC2, S3, and CloudFront for auto-scaling compute and edge delivery, cutting client-side load times ~50%.",
  "Designed a graph-based questionnaire engine using a state machine pattern for personalized user evaluation flows.",
  "Containerized a fault-tolerant ETL pipeline with Docker, Airflow, and Airbyte, syncing 5TB/day into ClickHouse for sub-second analytics.",
  "Built a centralized OAuth2 (Google/Apple) authentication service with OTP, JWT session management, and CAPTCHA verification.",
  "Set up Prometheus + Grafana observability, cutting incident resolution time ~65%.",
  "Used JMeter load testing plus JUnit/Mockito to improve API latency ~45%.",
  "Built cross-platform Flutter/Dart mobile apps, shipping UI improvements and fixing 800+ bugs — secondary to backend/AI work, only worth mentioning if asked about frontend or mobile specifically.",
];

// Node (the /api/ask.js serverless function) needs these via require(); the
// browser just uses the globals above, since this file is loaded as a plain
// <script> there, not as a module.
if (typeof module !== "undefined" && module.exports) {
  module.exports = { PROFILE, QA, FALLBACK_ANSWERS, FACTS };
}
