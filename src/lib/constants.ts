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
    id: "video-ai",
    name: "Video AI",
    items: [],
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
];
