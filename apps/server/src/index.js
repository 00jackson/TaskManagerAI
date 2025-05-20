"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hono_1 = require("hono");
const node_server_1 = require("@hono/node-server");
const generate_1 = __importDefault(require("./routes/generate"));
const tasks_1 = __importDefault(require("./routes/tasks"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = require("hono/cors"); // ✅ FIXED HERE
dotenv_1.default.config();
const app = new hono_1.Hono();
app.use('*', (0, cors_1.cors)({
    origin: ['https://task-manager-ai-xi.vercel.app/'],
}));
app.route("/generate", generate_1.default);
app.route("/tasks", tasks_1.default);
const port = process.env.PORT || 8787;
console.log(`🚀 Server running on http://localhost:${port}`);
(0, node_server_1.serve)({ fetch: app.fetch, port: +port });
