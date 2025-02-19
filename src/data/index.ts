import { db } from "@/db";
import { Item, ItemWithFeatures } from "@/db/schema";
import { unstable_cacheTag as cacheTag } from "next/cache";

export interface CategoryGroup {
  id: string;
  name: string;
  items: Item[];
}

type ItemType = "agent" | "tool";

export async function getCategorizedItems(
  type: ItemType,
): Promise<CategoryGroup[]> {
  "use cache";
  cacheTag("items");

  const result = await db.query.items.findMany({
    where: (table, { eq }) => eq(table.type, type),
    orderBy: (table, { desc }) => [desc(table.createdAt)],
  });

  const categories: CategoryGroup[] = [
    {
      id: "new-arrivals",
      name: "New Arrivals",
      items: result.filter((item) => item.isNew),
    },
    {
      id: "all-items",
      name: "All Items",
      items: result.filter((item) => !item.isNew),
    },
  ];

  console.log(categories);

  return categories;
}

export async function getItem(
  id: number,
): Promise<ItemWithFeatures | undefined> {
  const item = await db.query.items.findFirst({
    where: (table, { eq }) => eq(table.id, id),
    with: {
      features: true,
    },
  });

  return item;
}
