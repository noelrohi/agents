export interface Agent {
  name: string;
  description: string;
  tags: string[];
  avatar: string;
  href: string;
}

export interface Category {
  id: string;
  name: string;
  items: Agent[];
}

export const TOOLS_CATEGORIES: Category[] = [
  {
    id: "agent-framework",
    name: "Agent Framework",
    items: [
      {
        name: "julep.ai",
        description:
          "Backend for building AI agent workflows. A new DSL for building tasks and a server for running them. Allows companie so build and deploy AI pipelines in minues.",
        tags: ["agent", "workflow", "backend", "dsl"],
        avatar:
          "https://framerusercontent.com/images/lNddinFQ0DkoJDrlH9txWu6eqY.png",
        href: "https://julep.ai",
      },
      {
        name: "eliza",
        description: "Flexible, scalable AI agents for everyone",
        tags: ["agent", "framework", "ai"],
        avatar: "https://ai16z.github.io/eliza/img/favicon.ico",
        href: "https://ai16z.github.io/eliza/",
      },
      {
        name: "crew.ai",
        description: "Get things done with the help of AI agents",
        tags: ["agent", "framework", "productivity", "automation"],
        avatar: "https://crew.ai/agent.ai-gear/favicon/favicon.ico",
        href: "https://crew.ai/",
      },
      {
        name: "phidata",
        description:
          "An open-source platform to build, ship and monitor agentic systems.",
        tags: ["agent", "framework", "open-source", "monitoring", "platform"],
        avatar:
          "https://cdn.prod.website-files.com/66e0d4ef58ba78f56e23564e/670f0d0a54d0060dbe609d39_Favicon%20small%20(1).ico",
        href: "https://www.phidata.com/",
      },
    ],
  },
  {
    id: "audio-ai",
    name: "Audio AI",
    items: [
      {
        name: "Eleven Labs",
        href: "https://elevenlabs.io/",
        avatar: "https://elevenlabs.io/favicon.ico",
        description:
          "Create the most realistic speech with our AI audio tools in 1000s of voices and 32 languages.",
        tags: ["audio", "speech"],
      },
      {
        name: "wispr flow",
        href: "https://www.flowvoice.ai/",
        avatar:
          "https://cdn.prod.website-files.com/66ebf46fc61e2eda1bea8fda/66f30ae31e454b5365f3ca42_665f41672b93d025709c7085_flow%20logo%201.png",
        description:
          "Flow makes writing quick and clear with seamless voice dictation. It is the fastest, smartest way to type with your voice.",
        tags: ["speaking", "writing"],
      },
      {
        name: "shortcut",
        href: "https://www.poised.com/shortcut",
        description:
          "No more typing, just natural conversation. Get instant answers, turn your thoughts into solutions, and draft messages, emails, and docs in seconds —all while staying in your flow.",
        avatar:
          "https://cdn.prod.website-files.com/623ca68edd1e7fcbf0efec7d/6264e87b6f6a5086efb90f5e_favicon-32x32.png",
        tags: ["speaking", "writing", "ai"],
      },
    ],
  },
  {
    id: "communication",
    name: "Communication",
    items: [
      {
        name: "HappyRobot",
        description:
          "Automate communication across channels with AI workers that integrate with your systems, manage conversations, & log data.",
        tags: ["communication", "logistics"],
        avatar:
          "https://cdn.prod.website-files.com/674779c1e67f9e26af2459eb/674f853da4e68ea635266cf9_favicon.png",
        href: "https://happyrobot.ai",
      },
    ],
  },
  {
    id: "crawling-ai",
    name: "Crawler",
    items: [
      {
        name: "Seobot",
        description:
          "Boost your website's organic traffic without lifting a finger. SEObot is AI-driven solution designed to save you time and effort.",
        tags: ["seo", "website"],
        avatar:
          "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI2ZmNWUyMCIgY2xhc3NOYW1lPSJ3LTYgaC02Ij48cGF0aCBmaWxsUnVsZT0iZXZlbm9kZCIgZD0iTTkuMzE1IDcuNTg0QzEyLjE5NSAzLjg4MyAxNi42OTUgMS41IDIxLjc1IDEuNWEuNzUuNzUgMCAwIDEgLjc1Ljc1YzAgNS4wNTYtMi4zODMgOS41NTUtNi4wODQgMTIuNDM2QTYuNzUgNi43NSAwIDAgMSA5Ljc1IDIyLjVhLjc1Ljc1IDAgMCAxLS43NS0uNzV2LTQuMTMxQTE1LjgzOCAxNS44MzggMCAwIDEgNi4zODIgMTVIMi4yNWEuNzUuNzUgMCAwIDEtLjc1LS43NSA2Ljc1IDYuNzUgMCAwIDEgNy44MTUtNi42NjZaTTE1IDYuNzVhMi4yNSAyLjI1IDAgMSAwIDAgNC41IDIuMjUgMi4yNSAwIDAgMCAwLTQuNVoiIGNsaXBSdWxlPSJldmVub2RkIiAvPjxwYXRoIGQ9Ik01LjI2IDE3LjI0MmEuNzUuNzUgMCAxIDAtLjg5Ny0xLjIwMyA1LjI0MyA1LjI0MyAwIDAgMC0yLjA1IDUuMDIyLjc1Ljc1IDAgMCAwIC42MjUuNjI3IDUuMjQzIDUuMjQzIDAgMCAwIDUuMDIyLTIuMDUxLjc1Ljc1IDAgMSAwLTEuMjAyLS44OTcgMy43NDQgMy43NDQgMCAwIDEtMy4wMDggMS41MWMwLTEuMjMuNTkyLTIuMzIzIDEuNTEtMy4wMDhaIiAvPjwvc3ZnPg==",
        href: "https://app.seobotai.com",
      },
    ],
  },
  {
    id: "data-analysis",
    name: "Data Analysis",
    items: [
      {
        name: "julius.ai",
        avatar: "https://julius.ai/favicon.ico",
        href: "https://julius.ai",
        description: "Analyze your data with computational AI.",
        tags: ["reports", "insights", "files", "problem solving"],
      },
    ],
  },
  {
    id: "developer-tools",
    name: "Developer Tools",
    items: [
      {
        name: "warp",
        description:
          "Warp is the intelligent terminal with AI and your dev team's knowledge built-in. Available now on MacOS and Linux.",
        tags: ["terminal", "development", "ai"],
        avatar: "https://warp.dev/favicon.png",
        href: "https://warp.dev",
      },
      {
        name: "cursor",
        description:
          "AI-first code editor that helps you code smarter and faster",
        tags: ["code", "editor", "ai"],
        avatar: "https://cursor.sh/favicon.ico",
        href: "https://cursor.sh",
      },
      {
        name: "midscene.js",
        description:
          "Transform UI automation into a joyful experience with Midscene.js, enabling seamless interaction, querying, and assertions through natural language",
        tags: ["automation", "ui", "ai"],
        avatar: "https://midscenejs.com/midscene-icon.png",
        href: "https://midscenejs.com",
      },
      {
        name: "keak",
        description:
          "Boost your website's conversion rates. Generate variations, track performance, and achieve statistically significant results.",
        tags: ["a/b testing", "analytics", "optimization"],
        avatar:
          "https://framerusercontent.com/images/7O25asSN8XNyGB2KZM1hjlOLpBU.png",
        href: "https://keak.com",
      },
      {
        name: "coderabbit",
        description:
          "AI-powered code review assistant that helps teams ship better code faster",
        tags: ["code-review", "git", "automation"],
        avatar: "https://coderabbit.ai/favicon.ico",
        href: "https://coderabbit.ai",
      },
    ],
  },
  {
    id: "generative-ui",
    name: "Generative UI",
    items: [
      {
        name: "bolt",
        description: "Prompt, run, edit & deploy web apps",
        tags: ["design", "ui-generation"],
        avatar: "https://bolt.new/favicon.svg",
        href: "https://bolt.new",
      },
      {
        name: "lovable",
        description: "Build software products, using only a chat interface",
        tags: ["design", "ui-generation"],
        avatar: "https://lovable.dev/favicon.ico",
        href: "https://lovable.dev",
      },
      {
        name: "v0",
        description:
          "Chat with v0. Generate UI with simple text prompts. Copy, paste, ship.",
        tags: ["design", "ui-generation"],
        avatar: "https://v0.dev/assets/icon.svg",
        href: "https://v0.dev",
      },
    ],
  },
  {
    id: "image-generation",
    name: "Image Generation",
    items: [
      {
        name: "Everart",
        description:
          "Train AI on images of specific products, people or visual aesthetics. Create content like you've never seen before.",
        tags: ["content", "finetune", "marketing"],
        avatar: "https://everart.ai/favicon.ico",
        href: "https://everart.ai/",
      },
      {
        name: "Logo Creator",
        description:
          "Create beautiful logos for your brand. Generate logos from text descriptions.",
        tags: ["logo", "branding"],
        avatar: "https://www.logo-creator.io/favicon.ico",
        href: "https://www.logo-creator.io/",
      },
      {
        name: "Midjourney",
        href: "https://www.midjourney.com/",
        description:
          "Independent research lab exploring new mediums of thought and expanding the imaginative powers of the human species.",
        tags: ["image", "ai"],
        avatar: "https://www.midjourney.com/apple-touch-icon.png",
      },
      {
        name: "runware.ai",
        description:
          "Ultra-fast, lowest-cost generative media. Powered by custom hardware and renewable energy.",
        tags: ["image", "generative", "media"],
        avatar: "https://runware.ai/favicon/favicon-96x96.png",
        href: "https://runware.ai/",
      },
      {
        name: "Picmenu",
        href: "https://www.picmenu.co/",
        description:
          "Take a picture of your menu and get pictures of each dish so you can better decide what to order.",
        tags: ["menu", "dish"],
        avatar: "https://www.picmenu.co/favicon.ico",
      },
      {
        name: "Qreates",
        href: "https://qreates.com/",
        description: "High quality product images using AI",
        tags: ["image", "ai"],
        avatar: "https://qreates.com/_next/static/media/favicon.0ab139f2.ico",
      },
    ],
  },
  {
    name: "Others",
    id: "others",
    items: [
      {
        name: "LM Arena",
        href: "https://lmarena.ai/",
        description:
          "Chatbot Arena (formerly LMSYS): Free AI Chat to Compare & Test Best AI Chatbots",
        tags: ["chatbot", "ai", "comparison"],
        avatar:
          "https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://lmarena.ai&size=256",
      },
      {
        name: "DomainsGPT",
        href: "https://oneword.domains/domains-gpt",
        description: "Generate domains with AI",
        tags: ["domains", "ai"],
        avatar: "https://oneword.domains/logo.png",
      },
      {
        name: "bold voice",
        href: "https://start.boldvoice.com/accent-guesser",
        description: "Guess the accent of a voice",
        tags: [
          "pronunciation",
          "language learning",
          "ai feedback",
          "accent training",
        ],
        avatar:
          "https://cdn.prod.website-files.com/60fcddc4d806aae485f642fb/64449fbc6a788fa5bf224640_favicon32v2.png",
      },
    ],
  },
  {
    id: "video",
    name: "Video",
    items: [
      {
        name: "Sora",
        href: "https://sora.com",
        description:
          "Transform text and images into immersive videos. Animate stories, visualize ideas, and bring your concepts to life.",
        tags: ["video", "ai"],
        avatar: "https://openai.com/favicon.ico",
      },
      {
        name: "Zebracat",
        description:
          "Level up your video game with our AI video generator. Utilize powerful AI technology to produce eye-catching videos in minutes with Zebracat.",
        tags: ["video", "ai", "generator"],
        avatar:
          "https://cdn.prod.website-files.com/653c03c7c53a2bcd281722c6/65eed56bb67ec56a8456f152_fav.png",
        href: "https://www.zebracat.ai/",
      },
    ],
  },
  {
    id: "memory",
    name: "Memory",
    items: [
      {
        name: "Mem0",
        description:
          "Mem0 is a self-improving memory layer for LLM applications, enabling personalized AI experiences that save costs and delight users.",
        tags: ["memory", "llm", "personalization", "ai-infrastructure"],
        avatar:
          "https://framerusercontent.com/images/Ekk9VlcIzXMrrfQS4NHj9fdEKKE.png",
        href: "https://mem0.ai/",
      },
    ],
  },
];

export const AGENT_CATEGORIES = [
  {
    id: "consulting",
    name: "Consulting",
    items: [
      {
        name: "Marvin - Strategy Connect",
        href: "https://marvin.strategyconnect.co/?mode=try-marvin",
        description:
          "Marvin is a strategy consultant that helps you solve complex problems and make better decisions.",
        tags: ["consulting", "talent"],
        avatar: "https://strategyconnect.co/favicon.ico",
      },
    ],
  },
  {
    id: "development",
    name: "Development",
    items: [
      {
        name: "devin",
        description: "Your reliable AI software engineer",
        tags: ["development", "ai", "coding"],
        avatar: "https://app.devin.ai/favicon.ico",
        href: "https://app.devin.ai",
      },
      {
        name: "Dosu",
        description:
          "Dosu is an AI teammate that acts as the first line of defense against incoming issues and tedious tasks.",
        tags: [
          "development",
          "github",
          "automation",
          "issue-management",
          "code-review",
        ],
        avatar: "https://dosu.dev/favicon.ico",
        href: "https://dosu.dev/",
      },
    ],
  },
  {
    id: "operations",
    name: "Operations",
    items: [
      {
        name: "HappyRobot",
        description:
          "Automate communication across channels with AI workers that integrate with your systems, manage conversations, & log data.",
        tags: ["communication", "logistics"],
        avatar:
          "https://cdn.prod.website-files.com/674779c1e67f9e26af2459eb/674f853da4e68ea635266cf9_favicon.png",
        href: "https://happyrobot.ai",
      },
    ],
  },
  {
    id: "crypto",
    name: "Crypto & Trading",
    items: [
      {
        name: "AIXBT",
        description:
          "Automated trading agent that analyzes market data and shares crypto trading insights on Twitter.",
        tags: ["crypto", "trading", "automation", "twitter"],
        avatar: "https://aixbt.tech/favicon.ico",
        href: "https://twitter.com/aixbt_agent",
      },
      {
        name: "RopAIrito",
        description:
          "AI agent built with Eliza framework that analyzes market data and shares crypto trading insights on Twitter.",
        tags: ["crypto", "trading", "eliza", "twitter"],
        avatar:
          "https://pbs.twimg.com/profile_images/1767947897332908032/Aq_Hs_Ue_400x400.jpg",
        href: "https://twitter.com/ropAIrito",
      },
    ], // Ready for future crypto trading agents
  },
  {
    id: "customer-service",
    name: "Customer Service",
    items: [
      {
        name: "Sierra",
        description:
          "Elevate your customer experience with conversational AI tailored to your business. Designed with the highest commitment to security, compliance, and trust.",
        tags: [
          "communication",
          "customer-service",
          "conversational-ai",
          "security",
        ],
        avatar: "https://sierra.ai/icon.png",
        href: "https://sierra.ai",
      },
    ],
  },
  {
    id: "data-analytics",
    name: "Data & Analytics",
    items: [
      {
        name: "Wren AI",
        description:
          "Open-source SQL AI Agent for data teams to get results and insights faster by asking business questions without writing SQL. Supports BigQuery, DuckDB, PostgreSQL, JSON, Parquet, CSV, MySQL, MS SQL, ClickHouse, Excel, Google Sheet, and Trino.",
        tags: ["sql", "data", "analytics", "open-source"],
        avatar:
          "https://cdn.prod.website-files.com/65e9b9dd95692faa9f5bb1c0/65f9b1f91189e69786ecd34a_webclip.png",
        href: "https://getwren.ai/oss",
      },
    ],
  },
];
