import { Hono } from "hono";
import { z } from "zod";
import { generateTasks } from "../lib/gemini";

const generateRoute = new Hono();

const bodySchema = z.object({
  topic: z.string().min(3),
});

generateRoute.post("/", async (c) => {
  const body = await c.req.json();
  const parsed = bodySchema.safeParse(body);

  if (!parsed.success) {
    return c.json({ error: "Invalid topic" }, 400);
  }

  const tasks = await generateTasks(parsed.data.topic);
  return c.json({ tasks });
});

export default generateRoute;