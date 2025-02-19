import "server-only";
import { createGroq } from "@ai-sdk/groq";
import FirecrawlApp from "@mendable/firecrawl-js";
import {
  LanguageModel,
  extractReasoningMiddleware,
  generateObject,
  generateText,
  wrapLanguageModel,
} from "ai";
import { z } from "zod";
import { autoFillSystemPrompt, formattingPrompt } from "@/constants/prompts";
import { YoutubeTranscript } from "youtube-transcript";
import { insertItemSchema } from "@/db/zod";

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
});

const firecrawl = new FirecrawlApp({
  apiKey: process.env.FIRECRAWL_API_KEY,
});

const defaultModel = wrapLanguageModel({
  model: groq("deepseek-r1-distill-llama-70b"),
  middleware: extractReasoningMiddleware({ tagName: "think" }),
});

export async function processUrl(
  url: string,
  model: LanguageModel = defaultModel,
) {
  const scrapeResponse = await firecrawl.scrapeUrl(url);
  if (!scrapeResponse.success) {
    throw new Error("Failed to scrape url");
  }

  const { text, reasoning } = await generateText({
    model,
    prompt: formattingPrompt(JSON.stringify(scrapeResponse).slice(0, 6000)),
  });

  const { object } = await generateObject({
    model,
    schema: z.object({
      isValid: z.boolean(),
      data: insertItemSchema.omit({
        keybenefits: true,
        features: true,
        whoIsItFor: true,
      }),
    }),
    prompt: `Extract the JSON object from the following text: ${text}`,
  });

  return {
    text,
    reasoning,
    object,
  };
}

export async function processYoutubeUrl(
  url: string,
  model: LanguageModel = defaultModel,
) {
  const transcript = await YoutubeTranscript.fetchTranscript(url);
  console.log({ transcript });
  const { object } = await generateObject({
    model,
    schema: z.object({
      features: z.array(
        z.object({
          feature: z.string(),
          description: z.string(),
          timestampStart: z.number(),
          timestampEnd: z.number(),
        }),
      ),
      keybenefits: z.array(z.string()),
      whoIsItFor: z.array(z.string()),
    }),
    system: autoFillSystemPrompt,
    prompt: `Video URL: ${url}
    Transcript: ${transcript
      .map(
        (t) =>
          `--- Text: ${t.text} \n Offset: ${t.offset} \n Duration: ${t.duration} ---`,
      )
      .join("\n")}`,
  });

  return object;
}
