import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    DATABASE_AUTH_TOKEN: z.string().min(1),
    MYPASSWORD: z.string().min(1),
  },
  client: {
    // Add client-side environment variables here if needed
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    DATABASE_AUTH_TOKEN: process.env.DATABASE_AUTH_TOKEN,
    MYPASSWORD: process.env.MYPASSWORD,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
