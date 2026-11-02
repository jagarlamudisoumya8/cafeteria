import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { after, before, test } from "node:test";
import { createAppServer } from "./index.js";

const databasePath = join(tmpdir(), `cafeteria-${randomUUID()}.sqlite`);
let server;
let baseUrl;

before(async () => {
  server = createAppServer({ databasePath });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  await new Promise((resolve, reject) => {
    server.close((error) => error ? reject(error) : resolve());
  });
  rmSync(databasePath, { force: true });
});

async function post(path, body) {
  return fetch(`${baseUrl}${path}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

test("login normalizes registration numbers", async () => {
  const response = await post("/api/students/login", { reg: "ab123", name: "Student" });
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { reg: "AB123", name: "Student" });
});

test("orders use server prices and can be listed and cancelled", async () => {
  const response = await post("/api/orders", {
    reg: "AB123",
    name: "Student",
    items: [{ name: "Idli", canteen: "MHP Restarunt", price: 1 }],
  });
  assert.equal(response.status, 201);
  const order = await response.json();
  assert.equal(order.total, 30);
  assert.equal(order.items[0].price, 30);
  assert.equal(order.status, "Preparing");

  const listed = await fetch(`${baseUrl}/api/orders?reg=AB123`);
  assert.equal((await listed.json())[0]._id, order._id);

  const cancelled = await fetch(`${baseUrl}/api/orders/${order._id}/cancel`, {
    method: "PATCH",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ reg: "AB123" }),
  });
  assert.equal(cancelled.status, 200);
  assert.equal((await cancelled.json()).status, "Cancelled");

  await new Promise((resolve, reject) => {
    server.close((error) => error ? reject(error) : resolve());
  });
  server = createAppServer({ databasePath });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;

  const persistedOrders = await fetch(`${baseUrl}/api/orders?reg=AB123`);
  assert.equal((await persistedOrders.json())[0].status, "Cancelled");
});

test("rejects products that are not on the selected canteen menu", async () => {
  const response = await post("/api/orders", {
    reg: "AB123",
    name: "Student",
    items: [{ name: "Idli", canteen: "N Block canteen" }],
  });
  assert.equal(response.status, 400);
});
