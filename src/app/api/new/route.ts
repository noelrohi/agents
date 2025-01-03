import { db } from "@/db";
import { items } from "@/db/schema";
import { withUnkey } from "@unkey/nextjs";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { unstable_expireTag as expireTag } from "next/cache";

const newItemSchema = createInsertSchema(items, {
  tags: z.array(z.string()),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const POST = withUnkey(
  async (req) => {
    if (!req.unkey?.valid) {
      return new Response("Unauthorized", { status: 403 });
    }
    try {
      const body = await req.json();
      const parsedBody = newItemSchema.array().parse(body);
      const newItem = await db.insert(items).values(parsedBody).returning();

      expireTag("items");
      return Response.json(newItem);
    } catch (error) {
      console.error(error);
      return Response.json({ error: "Invalid request body" }, { status: 400 });
    }
  },
  {
    apiId: "api_2CuNTn1twmkNK4RntE9W8KTQLmjz",
  },
);
