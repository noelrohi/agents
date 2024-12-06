export type Agent = {
  name: string;
  description: string;
  tags: string[];
  avatar: string;
  href: string;
};

export type Category = {
  id: string;
  name: string;
  items: Agent[];
};

export const CATEGORIES: Category[] = [
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
    id: "generative-ui",
    name: "Generative UI",
    items: [
      {
        name: "v0",
        description:
          "Chat with v0. Generate UI with simple text prompts. Copy, paste, ship.",
        tags: ["design", "ui-generation"],
        avatar: "https://v0.dev/assets/icon.svg",
        href: "https://v0.dev",
      },
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
    ],
  },
  {
    id: "image-generation",
    name: "Image Generation",
    items: [
      {
        name: "Midjourney",
        href: "https://www.midjourney.com/",
        description:
          "Independent research lab exploring new mediums of thought and expanding the imaginative powers of the human species.",
        tags: ["image", "ai"],
        avatar: "https://www.midjourney.com/apple-touch-icon.png",
      },
      {
        name: "Qreates",
        href: "https://qreates.com/",
        description: "High quality product images using AI",
        tags: ["image", "ai"],
        avatar: "https://qreates.com/_next/static/media/favicon.0ab139f2.ico",
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
        name: "Everart",
        description:
          "Train AI on images of specific products, people or visual aesthetics. Create content like you've never seen before.",
        tags: ["content", "finetune", "marketing"],
        avatar: "https://everart.ai/favicon.ico",
        href: "https://everart.ai/",
      },
      {
        name: "Picmenu",
        href: "https://www.picmenu.co/",
        description:
          "Take a picture of your menu and get pictures of each dish so you can better decide what to order.",
        tags: ["menu", "dish"],
        avatar: "https://www.picmenu.co/favicon.ico",
      },
    ],
  },
  {
    id: "video-ai",
    name: "Video AI",
    items: [],
  },
];
