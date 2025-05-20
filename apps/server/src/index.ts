import { Hono } from "hono";
import { serve } from "@hono/node-server";
import generateRoute from "./routes/generate";
import taskRoute from "./routes/tasks";
import dotenv from "dotenv";
import { cors } from "hono/cors"; // ✅ FIXED HERE

dotenv.config();

const app = new Hono();

app.use('*', cors({
    origin: ['https://task-manager-ai-xi.vercel.app/'],
  }));

app.route("/generate", generateRoute);
app.route("/tasks", taskRoute);

const port = process.env.PORT || 8787;
console.log(`🚀 Server running on http://localhost:${port}`);
serve({ fetch: app.fetch, port: +port });