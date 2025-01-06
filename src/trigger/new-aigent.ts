import { openai } from "@ai-sdk/openai";
import { logger, task } from "@trigger.dev/sdk/v3";
import { generateObject } from "ai";
import Exa from "exa-js";
import { MemoryClient } from "mem0ai";
import { z } from "zod";

const memory = new MemoryClient({
  apiKey: process.env.MEM0AI_API_KEY!,
  organizationId: "org_SGiY8gY3JfiKggF3zuWHLU11BrVToShuCho0iiAa",
  projectId: "proj_iDX2o22tG7gv357Ku8RkOg5DGahVtviH6Hs62OaM",
});

const exa = new Exa(process.env.EXA_API_KEY!);

async function generateAigent(contents: string) {
  const prompt = `Generate new aigents with the following contents: ${contents}`;
  const { object } = await generateObject({
    model: openai("gpt-4o-mini"),
    system: "You generate ai tools/agents with the following contents: ",
    prompt,
    schema: z.object({
      aigents: z.array(
        z.object({
          type: z.enum(["tool", "agent"]).describe("Type of the ai tool/agent"),
          name: z.string().describe("Name of the ai tool/agent"),
          description: z.string().describe("Description of the ai tool/agent"),
          category: z.string().describe("Category of the ai tool/agent"),
          href: z.string().describe("website link of the ai tool/agent"),
          avatar: z.string().describe("avatar or favicon of the ai tool/agent"),
          tags: z.array(z.string()).describe("tags of the ai tool/agent"),
        }),
      ),
    }),
  });
  return object.aigents;
}

export const newAigent = task({
  id: "new-aigent",
  run: async ({ user_id }: { user_id: string }) => {
    logger.log("Getting memories");
    const memories = await memory.getAll({
      user_id,
    });
    logger.log(JSON.stringify({ memories }, null, 2));
    logger.log("Getting contents using EXA");
    const urls = memories
      .map((m) => m.memory)
      .filter((m) => m !== undefined) as string[];
    const exaContents = await exa.getContents(urls, {
      text: true,
    });
    logger.log(JSON.stringify({ exaResponse: exaContents.results }, null, 2));
    logger.log("Generating data with AI");
    const aigents = await generateAigent(JSON.stringify(exaContents.results));
    logger.log(JSON.stringify({ aigents }, null, 2));
    logger.log("Inserting data into database");
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.UNKEY_API_KEY}`,
      },
      body: JSON.stringify(aigents),
    });
    const data = await response.json();
    logger.log(JSON.stringify(data, null, 2));
    logger.log("Deleting memories");
    await memory.deleteAll({
      user_id,
    });
    return data;
  },
});
