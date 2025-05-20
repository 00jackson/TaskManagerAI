"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tasks = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.tasks = (0, pg_core_1.pgTable)("tasks", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    userId: (0, pg_core_1.varchar)("user_id", { length: 255 }).notNull(),
    content: (0, pg_core_1.text)("content").notNull(),
    completed: (0, pg_core_1.boolean)("completed").default(false),
    createdAt: (0, pg_core_1.timestamp)("created_at", { mode: "string" }).defaultNow(),
});
