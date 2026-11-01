// Edit this file to change what the bot knows about you.
// Each entry: id, the canonical question, keywords used for matching free-form/voice
// questions, and a list of `answers` variants — one is picked at random each time
// (never the same one twice in a row) so repeat visitors hear something fresh.

const PROFILE = {
  name: "Akshat Mishra",
  tagline: "Java Backend & AI Engineer — ask me anything from the interview guide",
};

const QA = [
  {
    id: "life_story",
    question: "What should we know about your life story in a few sentences?",
    keywords: ["life story", "about yourself", "tell me about you", "background", "who are you", "introduce yourself"],
    answers: [
      "I'm a backend and AI engineer. I studied CS at IIIT Dharwad, and for the past few years at a digital healthcare platform I've built most of the core backend in Java and Spring Boot — Kafka-driven messaging, a Stripe payment system processing $850K+, a Spring Cloud API gateway handling millions of weekly requests — and more recently I've layered AI on top of it: a Claude-powered RAG pipeline with LangChain4j and an agentic chatbot on the OpenAI Assistants API, both in production. I like owning a system end to end, from the database up through the AI layer.",
      "My background is Java and Spring Boot at the core, with a strong and growing focus on applied AI engineering. At Live Your Best Life I've architected microservices for payments, messaging, inventory, and authentication, and I've also built the AI-facing side of the product — a RAG pipeline with LangChain4j and Claude for clinical data extraction, and an agentic medical chatbot on OpenAI's Assistants API. I'm the engineer who ends up owning both the infrastructure and the intelligence layer on top of it.",
      "I'm a software engineer who's spent the last few years turning a healthcare platform's backend into a real distributed system — Kafka, Redis, Spring Boot microservices, an API gateway, centralized access control with 99.99% availability — and then building the AI engineering on top of that same foundation, from Claude-powered biomarker extraction to an OpenAI-driven medical assistant. CS degree from IIIT Dharwad; what started as an internship turned into a full-time role building production systems.",
    ],
  },
  {
    id: "superpower",
    question: "What's your #1 superpower?",
    keywords: ["superpower", "number one superpower", "best skill", "greatest strength", "biggest strength"],
    answers: [
      "Shipping production-grade backend and AI systems end to end. I built a RAG pipeline with LangChain4j and Claude that lifted user engagement by 55%, and an agentic OpenAI chatbot that drove a 45% increase in recommended sales — both architected, built, and shipped by me, in production, not in a demo.",
      "Turning ambiguous problems into reliable, scalable Java systems. I've built Kafka event pipelines that guarantee 100% data consistency across distributed services, and a Spring Cloud Gateway that centralizes routing and auth for millions of requests a week at 99.99% uptime. I don't just write code — I own the system's reliability.",
      "Bridging backend engineering and AI engineering. I can design the Kafka, Redis, and database infrastructure a system needs, and then build the LLM-powered layer on top of it myself — I've shipped both, on the same platform, measured by real business metrics like a 45% sales lift and a 55% engagement lift.",
    ],
  },
  {
    id: "growth_areas",
    question: "What are the top 3 areas you'd like to grow in?",
    keywords: ["grow", "growth", "areas to improve", "weaknesses", "improve in", "develop"],
    answers: [
      "Three things: going even deeper into applied AI and ML — moving from orchestrating models like Claude and GPT to building more of the model and evaluation layer myself; distributed systems design at an even larger scale than I operate at today; and sharpening how I communicate backend and AI tradeoffs to cross-functional teams.",
      "I want to push further into AI/ML engineering specifically — beyond LLM orchestration into areas like fine-tuning and evaluation pipelines — take on distributed systems challenges at a bigger scale than my current Kafka and Spring Boot work, and grow into more of a mentoring role as the teams around me scale up.",
      "Deeper applied machine learning beyond API-level LLM orchestration, large-scale distributed systems design beyond what I've tackled so far, and becoming a stronger technical communicator so I can translate backend and AI complexity for non-engineering stakeholders and leadership.",
    ],
  },
  {
    id: "misconception",
    question: "What misconception do your coworkers have about you?",
    keywords: ["misconception", "wrong about you", "misunderstand", "coworkers think"],
    answers: [
      "Because I move across so many systems — payments, messaging, AI, infrastructure — people sometimes assume I'm spread thin. In reality I go deep on each one before I ship it; the breadth is a byproduct of actually finishing things, like a Kafka pipeline with 100% data consistency or an AI chatbot running in production.",
      "People sometimes think that because I work mostly backend and AI, I'm disconnected from the end-user experience — but every system I've built was designed around a measurable outcome, like the 45% lift in recommended sales from the AI chatbot or the 55% lift in engagement from the RAG pipeline.",
      "Coworkers sometimes assume the AI features I've built were 'just API calls.' In reality, productionizing a LangChain4j RAG pipeline and an OpenAI Assistants-based chatbot at scale — with proper monitoring, reliability, and 99.99% uptime guarantees around them — is real systems engineering, not a plugin.",
    ],
  },
  {
    id: "push_boundaries",
    question: "How do you push your boundaries and limits?",
    keywords: ["push your boundaries", "push limits", "challenge yourself", "step outside comfort zone", "comfort zone"],
    answers: [
      "I take on the systems nobody else owns yet. Nobody had built our AI chatbot, our Kafka-based inbox, or our payment gateway before I did — I volunteer for the zero-to-one backend and AI work because that's where I learn fastest.",
      "I push myself by picking up new infrastructure under real pressure — learning Kafka, Redis, Resilience4j, and LangChain4j on the job while shipping production features for a live healthcare platform, instead of waiting until I feel fully ready.",
      "I regularly take ownership of systems outside my comfort zone — going from conventional Spring Boot services to orchestrating LLMs like Claude and GPT in production — and I treat not knowing something yet as a signal that I should be the one to build it.",
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
      "Strongly, yes — if this role is Java backend or AI engineering, that's exactly what I've been doing in production: Spring Boot microservices, Kafka, Redis, AWS, third-party integrations like Stripe and Shopify, and agentic AI on top of LangChain4j, Claude, and OpenAI, all with real metrics behind them — 99.99% uptime, 45-55% lifts in business outcomes, $850K+ processed. And whatever specific tool in the job description isn't already in that list, I've consistently picked up new infrastructure fast on the job — Kafka, Resilience4j, and LangChain4j were all things I learned while shipping production features, not in a classroom — so I ramp quickly on anything new.",
      "Yes — my track record is exactly the Java-plus-AI profile most teams are looking for right now: distributed systems in Spring Boot and Kafka, scalability and monitoring with Resilience4j, Prometheus and Grafana, and applied AI engineering with LangChain4j, Claude, and the OpenAI Assistants API, all shipped to production with measurable impact. For anything in the job description I haven't touched yet, my pattern is consistent — I learn the stack while building the feature, not before.",
      "I'd say so, especially for Java backend or AI engineering roles — I've built and operated the kind of systems those roles actually require: payments, messaging, API gateways, and agentic AI, at production scale with real reliability numbers behind them. Where a specific requirement is new to me, I treat that as the fastest way to find out how quickly I can get productive, which is usually within days, not months.",
    ],
  },
  {
    id: "frontend_ui",
    question: "What about your frontend, Flutter, or UI experience?",
    keywords: ["frontend", "front end", "flutter", "ui", "user interface", "mobile app", "react", "dart", "mobile development"],
    answers: [
      "My core focus is backend and AI engineering — Java, Spring Boot, Kafka, and the AI systems I build on top of them. That said, I am comfortable across the stack: I built and shipped cross-platform mobile apps in Flutter and Dart professionally, delivering UI enhancements and resolving 800+ bugs, so I can work in the frontend when a project needs it, I just prioritize backend and AI work by default.",
      "Backend and AI are where I spend most of my time and where I do my best work. On the frontend side, I have hands-on, professional experience in Flutter — shipping cross-platform mobile UI and fixing hundreds of bugs — so I'm not limited to the backend, it's just not my primary focus.",
      "I'd frame myself as backend-and-AI-first, frontend-capable: the majority of my production work is Java, Spring Boot, and AI systems, but I've also shipped real UI work in Flutter and Dart, including major interface improvements and resolving 800+ critical bugs, so I can step into frontend or mobile work when it's needed.",
    ],
  },
];

const FALLBACK_ANSWERS = [
  "That's not one of my prepared answers, but here's the short version: I'm a Java and Spring Boot backend engineer who also builds production AI systems — Kafka, Redis, AWS, third-party integrations, and agentic AI with LangChain4j and OpenAI. Try asking about my life story, my superpower, where I want to grow, a misconception people have about me, how I push my limits, or whether I'm a fit for a Java or AI engineering role.",
  "I don't have that one prepared, but in short: Java, Spring Boot, Kafka, Redis, AWS, and agentic AI with Claude and OpenAI are where I live day to day, backed by real production metrics. Try one of the suggested questions below, or ask me directly whether I'm a fit for a Java backend or AI engineering role.",
];
