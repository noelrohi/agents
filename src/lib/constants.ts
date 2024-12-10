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

export const CATEGORIES: Category[] = [
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
    id: "development",
    name: "Development",
    items: [
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
        name: "DomainsGPT",
        href: "https://oneword.domains/domains-gpt",
        description: "Generate domains with AI",
        tags: ["domains", "ai"],
        avatar: "https://oneword.domains/logo.png",
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
    ],
  },
];
