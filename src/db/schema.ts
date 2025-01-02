import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const items = sqliteTable(
  "items",
  (t) => ({
    id: t.integer().primaryKey(),
    name: t.text().notNull(),
    description: t.text().notNull(),
    category: t.text().notNull(),
    avatar: t.text(),
    href: t.text().notNull(),
    tags: t.text("tags", { mode: "json" }).$type<string[]>().default([]),
    type: t
      .text({ enum: ["agent", "tool"] })
      .notNull()
      .default("tool"),
    createdAt: t
      .integer()
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: t
      .integer()
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  }),
  () => [],
);
