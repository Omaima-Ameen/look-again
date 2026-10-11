
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import initSqlJs from "sql.js";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { randomUUID } from "node:crypto";
import process from "node:process";
import { Buffer } from "node:buffer";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "20kb" }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDirectory = path.join(__dirname, "data");
const databasePath = path.join(dataDirectory, "lookagain.sqlite");

fs.mkdirSync(dataDirectory, { recursive: true });

let db;

function persistDatabase() {
  const data = db.export();
  fs.writeFileSync(databasePath, Buffer.from(data));
}

function getNotes() {
  const result = db.exec(
    "SELECT * FROM field_notes ORDER BY created_at DESC"
  );

  if (!result.length) return [];

  const { columns, values } = result[0];

  return values.map((row) =>
    Object.fromEntries(columns.map((column, index) => [column, row[index]]))
  );
}

async function startServer() {
  const SQL = await initSqlJs();

  if (fs.existsSync(databasePath)) {
    const savedDatabase = fs.readFileSync(databasePath);
    db = new SQL.Database(new Uint8Array(savedDatabase));
  } else {
    db = new SQL.Database();
  }

  db.run(`
    CREATE TABLE IF NOT EXISTS field_notes (
      id TEXT PRIMARY KEY,
      mode TEXT NOT NULL DEFAULT 'surprise',
      reflection TEXT NOT NULL,
      title TEXT NOT NULL,
      insight TEXT NOT NULL,
      question TEXT NOT NULL,
      created_at TEXT NOT NULL
    )
  `);

  persistDatabase();

  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });


  app.get("/api/notes", (_req, res) => {
    res.json({ notes: getNotes() });
  });


  //gemini endpoint
  app.post("/api/generate-note", async (req, res) => {
  const { reflection, mode } = req.body ?? {};

  if (typeof reflection !== "string" || !reflection.trim()) {
    return res.status(400).json({
      error: "A reflection is required.",
    });
  }

  if (reflection.length > 2000) {
    return res.status(400).json({
      error: "Reflection must be 2000 characters or fewer.",
    });
  }

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({
      error: "Gemma API key is not configured.",
    });
  }

  try {
    const { GoogleGenAI } = await import("@google/genai");

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const response = await ai.models.generateContent({
      model: process.env.GEMMA_MODEL || "gemma-4-26b-a4b-it",
      contents: `
You are the reflective writing companion for Look Again.

Help people notice the real world more carefully.
Create a thoughtful field note based only on the user's observation.

Attention mode: ${String(mode || "surprise").slice(0, 40)}

User observation:
${reflection.trim()}

Return ONLY valid JSON with exactly these three string fields:
{
  "title": "A short memorable title",
  "insight": "A specific, thoughtful reflection in 1-3 sentences",
  "question": "One genuinely curious open-ended question"
}

Do not invent details. Avoid generic motivational clichés.
      `,
    });

    const text = response.text?.trim();

    if (!text) {
      throw new Error("Empty response from Gemma.");
    }

    const cleaned = text
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```$/, "");

    const note = JSON.parse(cleaned);

    if (
      typeof note.title !== "string" ||
      typeof note.insight !== "string" ||
      typeof note.question !== "string"
    ) {
      throw new Error("Invalid field note response.");
    }

    res.json({
      note: {
        title: note.title.slice(0, 200),
        insight: note.insight.slice(0, 2000),
        question: note.question.slice(0, 500),
      },
    });
  } catch (error) {
    console.error("Gemma generation failed:", error.message);

    res.status(502).json({
      error: "Could not generate your field note. Please try again.",
    });
  }
});

//yhan pe rhrga generate prompt endpoint

app.post("/api/generate-prompt", async (req, res) => {
  const { mode, modeLabel, guidance, previousObservations } =
    req.body ?? {};

  const allowedModes = new Set([
    "alive",
    "overlooked",
    "changing",
    "connection",
    "human",
    "surprise",
  ]);

  const selectedMode = allowedModes.has(mode)
    ? mode
    : "surprise";

  const safeLabel =
    typeof modeLabel === "string"
      ? modeLabel.slice(0, 100)
      : selectedMode;

  const safeGuidance =
    typeof guidance === "string"
      ? guidance.slice(0, 500)
      : "";

  const history = Array.isArray(previousObservations)
    ? previousObservations
        .filter((item) => typeof item === "string")
        .slice(0, 5)
        .map((item) => item.slice(0, 300))
    : [];

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({
      error: "Gemma API key is not configured.",
    });
  }

  try {
    const { GoogleGenAI } = await import("@google/genai");

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const historyText = history.length
      ? `
Previous observations from this user:
${history.map((item, index) => `${index + 1}. ${item}`).join("\n")}

Use these observations only if they help create a thoughtful,
personalized question. Do not invent observations or claim
the user noticed something that is not written here.
`
      : "No previous observations are available yet.";

    const response = await ai.models.generateContent({
      model:
        process.env.GEMMA_MODEL ||
        "gemma-4-26b-a4b-it",

      contents: `
You create attention prompts for Look Again, an app that
helps people notice the real world more carefully.

Selected attention mode: ${selectedMode}
Mode name: ${safeLabel}
Mode guidance: ${safeGuidance}

${historyText}

Create ONE fresh, thoughtful question or invitation for the
user to explore in the physical world.

Requirements:
- Stay faithful to the selected attention mode.
- Make it concrete and easy to act on outdoors.
- If previous observations are available, gently build on
  them when genuinely relevant.
- Never assume the user's location or surroundings.
- Do not require taking a photo or using a phone outdoors.
- Avoid generic motivational language.
- Use one or two concise sentences.
- Return only the question, with no title or explanation.
      `,
    });

    const question = response.text?.trim();

    if (!question) {
      throw new Error("Gemma returned an empty prompt.");
    }

    res.json({
      question: question
        .replace(/^["']|["']$/g, "")
        .slice(0, 600),
    });
  } catch (error) {
    console.error(
      "Gemma prompt generation failed:",
      error.message
    );

    res.status(502).json({
      error: "Could not generate your attention question. Please try again.",
    });
  }
});

  app.post("/api/notes", (req, res) => {
    const { mode, reflection, title, insight, question } = req.body ?? {};

    if (typeof reflection !== "string" || !reflection.trim()) {
      return res.status(400).json({
        error: "A reflection is required.",
      });
    }

    if (reflection.length > 2000) {
      return res.status(400).json({
        error: "Reflection must be 2000 characters or fewer.",
      });
    }

    const note = {
      id: randomUUID(),
      mode: typeof mode === "string" ? mode.slice(0, 40) : "surprise",
      reflection: reflection.trim(),
      title:
        typeof title === "string" && title.trim()
          ? title.trim().slice(0, 200)
          : "A moment, noticed.",
      insight:
        typeof insight === "string"
          ? insight.trim().slice(0, 2000)
          : "The world is full of details worth noticing.",
      question:
        typeof question === "string"
          ? question.trim().slice(0, 500)
          : "What else might you discover if you looked closer?",
      created_at: new Date().toISOString(),
    };

    try {
      db.run(
        `INSERT INTO field_notes
          (id, mode, reflection, title, insight, question, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          note.id,
          note.mode,
          note.reflection,
          note.title,
          note.insight,
          note.question,
          note.created_at,
        ]
      );

      persistDatabase();

      res.status(201).json({ note });
    } catch (error) {
      console.error("Could not save field note:", error);
      res.status(500).json({ error: "Could not save field note." });
    }
  });

  app.delete("/api/notes/:id", (req, res) => {
    try {
      db.run("DELETE FROM field_notes WHERE id = ?", [req.params.id]);
      persistDatabase();

      res.json({ success: true });
    } catch (error) {
      console.error("Could not delete field note:", error);
      res.status(500).json({ error: "Could not delete field note." });
    }
  });

  app.listen(PORT, () => {
    console.log(`Look Again API running at http://localhost:${PORT}`);
    console.log(`Database: ${databasePath}`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start Look Again API:", error);
  process.exit(1);
});
