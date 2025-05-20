"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const hono_1 = require("hono");
const db_1 = require("../db");
const schema_1 = require("../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
const taskRoute = new hono_1.Hono();
// GET all tasks for a user
taskRoute.get("/", (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = c.req.query("userId");
        console.log("Incoming userId:", userId);
        if (!userId)
            return c.json({ error: "Missing userId" }, 400);
        const result = yield db_1.db
            .select()
            .from(schema_1.tasks)
            .where((0, drizzle_orm_1.eq)(schema_1.tasks.userId, userId));
        return c.json(result);
    }
    catch (err) {
        console.error("GET /tasks error:", err);
        return c.json({ error: "Internal server error" }, 500);
    }
}));
// POST create single task
taskRoute.post("/", (c) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, content, completed = false } = yield c.req.json();
    if (!userId || !content) {
        return c.json({ error: "Missing fields" }, 400);
    }
    const [newTask] = yield db_1.db.insert(schema_1.tasks)
        .values({ userId, content, completed })
        .returning();
    return c.json(newTask);
}));
// PUT update task
taskRoute.put("/:id", (c) => __awaiter(void 0, void 0, void 0, function* () {
    const idParam = c.req.param("id");
    const id = Number(idParam);
    // If id is not a valid number, return an error
    if (isNaN(id)) {
        return c.json({ error: "Invalid task ID" }, 400);
    }
    const { content, completed } = yield c.req.json();
    yield db_1.db.update(schema_1.tasks).set({ content, completed }).where((0, drizzle_orm_1.eq)(schema_1.tasks.id, id));
    return c.json({ success: true });
}));
// DELETE task
taskRoute.delete("/:id", (c) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(c.req.param("id"));
    yield db_1.db.delete(schema_1.tasks).where((0, drizzle_orm_1.eq)(schema_1.tasks.id, id));
    return c.json({ success: true });
}));
exports.default = taskRoute;
