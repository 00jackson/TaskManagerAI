import { pgTable, serial, varchar, text, boolean, timestamp } from "drizzle-orm/pg-core";

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 255 }).notNull(),
  content: text("content").notNull(),
  completed: boolean("completed").default(false),
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow(),
});