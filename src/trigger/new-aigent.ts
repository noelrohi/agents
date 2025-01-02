import { env } from "@/env";
import { task } from "@trigger.dev/sdk/v3";
import Exa from "exa-js";

const exa = new Exa(env.EXA_API_KEY);

export const newAigent = task({
  id: "new-aigent",
  run: async (payload: { url: string }) => {
    const { url } = payload;
    const response = await exa.getContents([url], {
      text: true,
    });
    return response;
  },
});
