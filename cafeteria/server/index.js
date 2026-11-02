import { randomUUID } from "node:crypto";
import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createServer } from "node:http";
import { DatabaseSync } from "node:sqlite";
import { findMenuItem } from "./catalog.js";

const MAX_BODY_BYTES = 1024 * 1024;
const DEFAULT_DATABASE_PATH = fileURLToPath(new URL("./data/cafeteria.sqlite", import.meta.url));

class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

function sendJson(response, status, value) {
  response.writeHead(status, { "content-type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(value));
}

async function readJson(request) {
  let body = "";

  for await (const chunk of request) {
    body += chunk;
    if (Buffer.byteLength(body) > MAX_BODY_BYTES) {
      throw new ApiError(413, "Request body is too large.");
    }
  }

  try {
    return JSON.parse(body);
  } catch {
    throw new ApiError(400, "Request body must be valid JSON.");
  }
}

function requireObject(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new ApiError(400, "Request body must be a JSON object.");
  }
  return value;
}

function requiredText(value, label, maxLength) {
  if (typeof value !== "string" || !value.trim() || value.trim().length > maxLength) {
    throw new ApiError(400, `${label} is required and must be at most ${maxLength} characters.`);
  }

  return value.trim();
}

function normalizeReg(value) {
  return requiredText(value, "Registration number", 32).toUpperCase();
}

function serializeOrder(row) {
  return {
    _id: row.id,
    token: String(row.token),
    student: row.student,
    reg: row.reg,
    studentEmail: "",
    items: JSON.parse(row.items),
    total: row.total,
    canteenName: row.canteen_name,
    payment: row.payment,
    status: row.status,
    time: new Date(row.created_at).toLocaleString(),
  };
}

export function createAppServer({ databasePath = process.env.DATABASE_PATH ?? DEFAULT_DATABASE_PATH } = {}) {
  const resolvedDatabasePath = databasePath === ":memory:" ? databasePath : resolve(databasePath);
  if (typeof resolvedDatabasePath === "string" && resolvedDatabasePath !== ":memory:") {
    mkdirSync(dirname(resolvedDatabasePath), { recursive: true });
  }

  const database = new DatabaseSync(resolvedDatabasePath);
  database.exec(`
    PRAGMA foreign_keys = ON;
    CREATE TABLE IF NOT EXISTS students (
      reg TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      token INTEGER NOT NULL UNIQUE,
      reg TEXT NOT NULL REFERENCES students(reg),
      student TEXT NOT NULL,
      items TEXT NOT NULL,
      total INTEGER NOT NULL,
      canteen_name TEXT NOT NULL,
      payment TEXT NOT NULL,
      status TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
  `);

  const server = createServer(async (request, response) => {
    response.setHeader("access-control-allow-origin", "*");
    response.setHeader("access-control-allow-methods", "GET, POST, PATCH, OPTIONS");
    response.setHeader("access-control-allow-headers", "content-type");

    if (request.method === "OPTIONS") {
      response.writeHead(204);
      response.end();
      return;
    }

    try {
      const url = new URL(request.url, "http://localhost");

      if (request.method === "GET" && url.pathname === "/api/health") {
        sendJson(response, 200, { status: "ok" });
        return;
      }

      if (request.method === "POST" && url.pathname === "/api/students/login") {
        const body = requireObject(await readJson(request));
        const reg = normalizeReg(body.reg);
        const name = requiredText(body.name, "Student name", 80);
        const now = new Date().toISOString();
        database.prepare(`
          INSERT INTO students (reg, name, created_at, updated_at)
          VALUES (?, ?, ?, ?)
          ON CONFLICT(reg) DO UPDATE SET name = excluded.name, updated_at = excluded.updated_at
        `).run(reg, name, now, now);
        sendJson(response, 200, { reg, name });
        return;
      }

      if (request.method === "GET" && url.pathname === "/api/orders") {
        const reg = normalizeReg(url.searchParams.get("reg"));
        const rows = database.prepare(
          "SELECT * FROM orders WHERE reg = ? ORDER BY token DESC",
        ).all(reg);
        sendJson(response, 200, rows.map(serializeOrder));
        return;
      }

      if (request.method === "POST" && url.pathname === "/api/orders") {
        const body = requireObject(await readJson(request));
        const reg = normalizeReg(body.reg);
        const name = requiredText(body.name, "Student name", 80);

        if (!Array.isArray(body.items) || body.items.length === 0 || body.items.length > 50) {
          throw new ApiError(400, "An order must contain between 1 and 50 items.");
        }

        const items = body.items.map((item) => {
          if (!item || typeof item !== "object") {
            throw new ApiError(400, "Each order item must be an object.");
          }
          const itemName = requiredText(item.name, "Item name", 100);
          const canteen = requiredText(item.canteen, "Canteen", 100);
          const menuItem = findMenuItem(canteen, itemName);
          if (!menuItem) {
            throw new ApiError(400, `The menu item "${itemName}" is not available at ${canteen}.`);
          }
          return { ...menuItem, quantity: 1 };
        });

        const total = items.reduce((sum, item) => sum + item.price, 0);
        const canteenName = [...new Set(items.map((item) => item.canteen))].join(", ");
        const id = randomUUID();
        const now = new Date().toISOString();
        let token;

        database.exec("BEGIN IMMEDIATE");
        try {
          database.prepare(`
            INSERT INTO students (reg, name, created_at, updated_at)
            VALUES (?, ?, ?, ?)
            ON CONFLICT(reg) DO UPDATE SET name = excluded.name, updated_at = excluded.updated_at
          `).run(reg, name, now, now);
          token = database.prepare("SELECT COALESCE(MAX(token), 0) + 1 AS next_token FROM orders").get().next_token;
          database.prepare(`
            INSERT INTO orders (id, token, reg, student, items, total, canteen_name, payment, status, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, 'Cash', 'Preparing', ?)
          `).run(id, token, reg, name, JSON.stringify(items), total, canteenName, now);
          database.exec("COMMIT");
        } catch (error) {
          database.exec("ROLLBACK");
          throw error;
        }

        const order = database.prepare("SELECT * FROM orders WHERE id = ?").get(id);
        sendJson(response, 201, serializeOrder(order));
        return;
      }

      const cancelMatch = url.pathname.match(/^\/api\/orders\/([^/]+)\/cancel$/);
      if (request.method === "PATCH" && cancelMatch) {
        const body = requireObject(await readJson(request));
        const reg = normalizeReg(body.reg);
        const id = decodeURIComponent(cancelMatch[1]);
        const order = database.prepare("SELECT * FROM orders WHERE id = ?").get(id);

        if (!order || order.reg !== reg) {
          throw new ApiError(404, "Order not found.");
        }
        if (order.status !== "Preparing") {
          throw new ApiError(409, "Only orders that are still preparing can be cancelled.");
        }

        database.prepare("UPDATE orders SET status = 'Cancelled' WHERE id = ?").run(id);
        sendJson(response, 200, serializeOrder(database.prepare("SELECT * FROM orders WHERE id = ?").get(id)));
        return;
      }

      throw new ApiError(404, "Endpoint not found.");
    } catch (error) {
      if (error instanceof ApiError) {
        sendJson(response, error.status, { error: error.message });
        return;
      }

      console.error("API request failed:", error);
      sendJson(response, 500, { error: "An unexpected server error occurred." });
    }
  });

  server.on("close", () => database.close());
  return server;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const port = Number(process.env.PORT ?? 3001);
  const host = process.env.HOST ?? "0.0.0.0";
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("PORT must be a valid TCP port.");
  }

  createAppServer().listen(port, host, () => {
    console.log(`Cafeteria API listening on http://${host}:${port}`);
  });
}
