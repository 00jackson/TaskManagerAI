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
exports.generateTasks = generateTasks;
function generateTasks(topic) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e;
        const prompt = `You are an AI tutor. Give me 5 unique, simple, and practical tasks to learn about "${topic}". Just return the tasks in plain text, each on a new line.`;
        const response = yield fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: {
                    temperature: 0.8,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 256,
                    stopSequences: [],
                },
            }),
        });
        const json = yield response.json();
        console.log("Gemini raw JSON:", json);
        const rawText = ((_e = (_d = (_c = (_b = (_a = json.candidates) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.content) === null || _c === void 0 ? void 0 : _c.parts) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e.text) || "";
        console.log("Raw text from Gemini:", rawText);
        if (!rawText) {
            return ["Watch a Python crash course", "Learn variables and data types", "Practice basic functions", "Build a calculator", "Read Python docs"];
        }
        return rawText
            .split(/[\n•-]/)
            .map((line) => line.trim())
            .filter(Boolean);
    });
}
