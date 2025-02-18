import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import { items } from "./schema";
import { z } from "zod";

export const selectItemSchema = createSelectSchema(items);

export const insertItemSchema = createInsertSchema(items);

export const updateItemSchema = createUpdateSchema(items, {
  tags: z.array(z.string()).nullish(),
});
