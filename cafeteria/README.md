# Cafeteria

A React/Vite cafeteria ordering app with a Node.js HTTP API and a persistent SQLite database.

## Run locally

Use Node.js 22.13 or newer.

```sh
npm install
npm run server
```

In a second terminal, start the frontend:

```sh
npm run dev
```

Vite proxies `/api` requests to the backend at `http://localhost:3001`. The SQLite database is created at `server/data/cafeteria.sqlite` and is excluded from Git. Set `PORT` to change the backend port; set `DATABASE_PATH` to store the database elsewhere.

For a separately hosted frontend, set `VITE_API_URL` to the backend's public origin at build time. The API allows cross-origin requests for this deployment setup.

## API

- `GET /api/health` — health check
- `POST /api/students/login` — create or update a student using `{ "reg": "...", "name": "..." }`
- `GET /api/orders?reg=...` — list a student's orders
- `POST /api/orders` — place an order using `{ "reg": "...", "name": "...", "items": [{ "name": "...", "canteen": "..." }] }`
- `PATCH /api/orders/:id/cancel` — cancel a preparing order using `{ "reg": "..." }`

Prices and totals are calculated by the server from its menu catalog. Order tokens are assigned transactionally and orders persist across server restarts.

The current student login asks only for a registration number and name; it is a demo identity flow, not secure authentication. Use institutional authentication before deploying for real student accounts.
