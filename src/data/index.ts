import { db } from "@/db";
import { Item } from "@/db/schema";
import { UTCDate } from "@date-fns/utc";
import { isSameDay } from "date-fns";
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

  const now = new UTCDate(new UTCDate().getTime() + 1000 * 60 * 60 * 24);
  const yesterday = new UTCDate(now.getTime() - 24 * 60 * 60 * 1000);

  // Split items into new arrivals and the rest
  const newArrivals: Item[] = [];
  const otherItems: Item[] = [];

  result.forEach((item) => {
    const createdAt = new UTCDate(item.createdAt).getTime();
    if (isSameDay(createdAt, yesterday) || isSameDay(createdAt, now)) {
      newArrivals.push(item);
    } else {
      otherItems.push(item);
    }
  });

  return [
    {
      id: "new",
      name: "New Arrivals",
      items: newArrivals,
    },
    {
      id: "all",
      name: "All Items",
      items: otherItems,
    },
  ];
}
