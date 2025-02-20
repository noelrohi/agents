import { autoFillSystemPrompt, formattingPrompt } from "@/constants/prompts";
import { insertItemSchema } from "@/db/zod";
import FirecrawlApp from "@mendable/firecrawl-js";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { LanguageModel, generateObject, generateText } from "ai";
import "server-only";
import { YoutubeTranscript } from "youtube-transcript";
import { z } from "zod";

const firecrawl = new FirecrawlApp({
  apiKey: process.env.FIRECRAWL_API_KEY,
});

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

const defaultModel = openrouter("google/gemini-2.0-flash-001");

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
    system: formattingPrompt,
    prompt: `here is the json object: ${JSON.stringify(scrapeResponse)}`,
  });

  console.log({ text });
  console.log({ reasoning });

  const { object } = await generateObject({
    model: openrouter("openai/gpt-4o-mini"),
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
      .join("\n")
      .slice(0, 6000)}`,
  });

  return object;
}
