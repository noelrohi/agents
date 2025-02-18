"use server";

import { db } from "@/db";
import { items } from "@/db/schema";
import { updateItemSchema } from "@/db/zod";
import { eq } from "drizzle-orm";
import { z } from "zod";

export async function updateItem(
  id: number,
  item: z.infer<typeof updateItemSchema>,
) {
  await db.update(items).set(item).where(eq(items.id, id));
}
