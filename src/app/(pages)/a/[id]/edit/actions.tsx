"use server";

import { db } from "@/db";
import { items } from "@/db/schema";
import { updateItemSchema } from "@/db/zod";
import { editFlag } from "@/flags";
import { eq } from "drizzle-orm";
import { z } from "zod";

export async function updateItem(
  id: number,
  item: z.infer<typeof updateItemSchema>,
) {
  const canEdit = await editFlag();
  if (!canEdit) {
    throw new Error("You are not authorized to edit this item", {
      cause: 403,
    });
  }
  await db.update(items).set(item).where(eq(items.id, id));
}
