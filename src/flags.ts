import { flag } from "@vercel/flags/next";
import { env } from "./env";

export const editFlag = flag({
  key: "edit",
  decide: () => env.EDIT_MODE === true,
});
