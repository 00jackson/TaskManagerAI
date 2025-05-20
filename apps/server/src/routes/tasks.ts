import { Hono } from "hono";
import { db } from "../db";
import { tasks } from "../db/schema";
import { eq } from "drizzle-orm";

const taskRoute = new Hono();

// GET all tasks for a user
taskRoute.get("/", async (c) => {
    try {
      const userId = c.req.query("userId");
      console.log("Incoming userId:", userId);
  
      if (!userId) return c.json({ error: "Missing userId" }, 400);
  
      const result = await db
        .select()
        .from(tasks)
        .where(eq(tasks.userId, userId));
  
      return c.json(result);
    } catch (err) {
      console.error("GET /tasks error:", err);
      return c.json({ error: "Internal server error" }, 500);
    }
  });
// POST create single task
taskRoute.post("/", async (c) => {
  const { userId, content, completed = false } = await c.req.json();

  if (!userId || !content) {
    return c.json({ error: "Missing fields" }, 400);
  }

  const [newTask] = await db.insert(tasks)
    .values({ userId, content, completed })
    .returning();

  return c.json(newTask);
});

// PUT update task
taskRoute.put("/:id", async (c) => {
  const idParam = c.req.param("id");
  const id = Number(idParam);

  // If id is not a valid number, return an error
  if (isNaN(id)) {
    return c.json({ error: "Invalid task ID" }, 400);
  }

  const { content, completed } = await c.req.json();

  await db.update(tasks).set({ content, completed }).where(eq(tasks.id, id));
  return c.json({ success: true });
});
// DELETE task
taskRoute.delete("/:id", async (c) => {
  const id = Number(c.req.param("id"));
  await db.delete(tasks).where(eq(tasks.id, id));
  return c.json({ success: true });
});

export default taskRoute;