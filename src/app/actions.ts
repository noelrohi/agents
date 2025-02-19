"use server";

import { db } from "@/db";
import { features, items } from "@/db/schema";
import { insertItemSchema } from "@/db/zod";
import { editFlag } from "@/flags";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { unstable_expireTag as expireTag } from "next/cache";
import { processUrl } from "@/lib/process-with-ai";
import { processYoutubeUrl } from "@/lib/process-with-ai";

export async function refreshAgents() {
  expireTag("items");
}

export async function updateItem(
  id: number,
  item: z.infer<typeof insertItemSchema>,
) {
  const canEdit = await editFlag();
  if (!canEdit) {
    throw new Error("You are not authorized to edit this item", {
      cause: 403,
    });
  }
  await db.transaction(async (tx) => {
    await tx.update(items).set(item).where(eq(items.id, id));
    await tx.delete(features).where(eq(features.itemId, id));
    const values: (typeof features.$inferInsert)[] = item.features.map(
      (feature) => ({
        ...feature,
        itemId: id,
      }),
    );
    if (values.length > 0) {
      await tx.insert(features).values(values);
    }
  });
}

export async function createItem(item: z.infer<typeof insertItemSchema>) {
  await db.transaction(async (tx) => {
    const [{ id }] = await tx
      .insert(items)
      .values(item)
      .returning({ id: items.id });
    const values: (typeof features.$inferInsert)[] = item.features.map(
      (feature) => ({
        ...feature,
        itemId: id,
      }),
    );
    if (values.length > 0) {
      await tx.insert(features).values(values);
    }
  });
}

export async function autofillItem({
  videoUrl,
  websiteUrl,
}: {
  videoUrl: string;
  websiteUrl: string;
}) {
  const canEdit = await editFlag();
  if (!canEdit) {
    throw new Error("You are not authorized to edit this item", {
      cause: 403,
    });
  }
  const [video, website] = await Promise.all([
    processYoutubeUrl(videoUrl),
    processUrl(websiteUrl),
  ]);
  return {
    video,
    website,
  };
}
