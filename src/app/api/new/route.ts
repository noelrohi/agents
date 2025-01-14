import { db } from "@/db";
import { items } from "@/db/schema";
import { withUnkey } from "@unkey/nextjs";
import { eq } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { unstable_expireTag as expireTag } from "next/cache";
import { z } from "zod";

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
      const newItem = await db.transaction(async (tx) => {
        // Set yesterday's items to isNew = false
        await db
          .update(items)
          .set({
            isNew: false,
          })
          .where(eq(items.isNew, true));
        // Set today's items to isNew = true
        const newItem = await tx
          .insert(items)
          .values(
            parsedBody.map((i) => ({
              ...i,
              isNew: true,
            })),
          )
          .returning();
        return newItem;
      });

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
