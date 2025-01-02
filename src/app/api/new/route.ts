import { db } from "@/db";
import { items } from "@/db/schema";
import { env } from "@/env";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

const newItemSchema = createInsertSchema(items, {
  tags: z.array(z.string()),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export async function POST(req: Request) {
  const password = req.headers.get("Authorization");
  if (password !== env.MYPASSWORD) {
    return Response.json({ error: "Invalid password" }, { status: 401 });
  }
  try {
    const body = await req.json();
    const parsedBody = newItemSchema.parse(body);
    const newItem = await db.insert(items).values(parsedBody).returning();

    return Response.json(newItem);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }
}
