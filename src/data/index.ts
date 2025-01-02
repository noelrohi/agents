import { db } from "@/db";
import { items } from "@/db/schema";
import { UTCDate } from "@date-fns/utc";
import { eq, sql } from "drizzle-orm";
import { isSameDay } from "date-fns";

interface CategoryItem {
  name: string;
  description: string;
  tags: string;
  avatar: string | null;
  href: string;
  createdAt: string;
}

export interface CategoryGroup {
  id: string;
  name: string;
  items: CategoryItem[];
}

type ItemType = "agent" | "tool";

export async function getCategorizedItems(
  type: ItemType,
): Promise<CategoryGroup[]> {
  const result = await db
    .select({
      category: items.category,
      items: sql<string>`json_group_array(
      json_object(
        'name', ${items.name},
        'description', ${items.description},
        'tags', ${items.tags},
        'avatar', ${items.avatar},
        'href', ${items.href},
        'createdAt', ${items.createdAt}
      )
    )`.as("items"),
    })
    .from(items)
    .where(eq(items.type, type))
    .groupBy(items.category)
    .orderBy(items.category)
    .execute();

  const now = new UTCDate();
  const yesterday = new UTCDate(now.getTime() - 24 * 60 * 60 * 1000);
  const itemResults = result.flatMap(
    (row) => JSON.parse(row.items) as CategoryItem[],
  );

  const newCategory: CategoryGroup = {
    id: "new",
    name: "New Arrivals",
    items: itemResults.filter((item) => {
      console.log(new UTCDate(item.createdAt), now, item.name);
      const createdAt = new UTCDate(item.createdAt).getTime();
      return isSameDay(createdAt, yesterday) || isSameDay(createdAt, now);
    }),
  };

  const categoryGroups = result.map(
    (row): CategoryGroup => ({
      id: row.category,
      name: row.category,
      items: JSON.parse(row.items) as CategoryItem[],
    }),
  );
  return [newCategory, ...categoryGroups];
}
