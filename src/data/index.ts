import { db } from "@/db";
import { items } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { unstable_cacheLife as cacheLife } from "next/cache";

interface CategoryItem {
  name: string;
  description: string;
  tags: string;
  avatar: string | null;
  href: string;
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
  "use cache";
  cacheLife({
    stale: 3600, // 1 hour
    revalidate: 900, // 15 minutes
    expire: 86400, // 1 day
  });
  const result = await db
    .select({
      category: items.category,
      items: sql<string>`json_group_array(
      json_object(
        'name', ${items.name},
        'description', ${items.description},
        'tags', ${items.tags},
        'avatar', ${items.avatar},
        'href', ${items.href}
      )
    )`.as("items"),
    })
    .from(items)
    .where(eq(items.type, type))
    .groupBy(items.category)
    .orderBy(items.category)
    .execute();

  return result.map(
    (row): CategoryGroup => ({
      id: row.category,
      name: row.category,
      items: JSON.parse(row.items) as CategoryItem[],
    }),
  );
}
