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
const zod_1 = require("zod");
const gemini_1 = require("../lib/gemini");
const generateRoute = new hono_1.Hono();
const bodySchema = zod_1.z.object({
    topic: zod_1.z.string().min(3),
});
generateRoute.post("/", (c) => __awaiter(void 0, void 0, void 0, function* () {
    const body = yield c.req.json();
    const parsed = bodySchema.safeParse(body);
    if (!parsed.success) {
        return c.json({ error: "Invalid topic" }, 400);
    }
    const tasks = yield (0, gemini_1.generateTasks)(parsed.data.topic);
    return c.json({ tasks });
}));
exports.default = generateRoute;
