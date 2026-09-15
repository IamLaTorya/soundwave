# SoundWave — Connection Sprint Starter

This repo holds **two separate programs**:

```
soundwave-starter/
├── client/     ← the React app.  Given to you, already working.
└── server/     ← the Express API. Yours to work on.
```

They are not one project. They have their own `package.json`, their own
dependencies, and their own port. They only ever talk to each other over
HTTP. That separateness is the whole point of this sprint.

---

## Day 0 — before Monday

You need **Node.js 20 or newer**. Check:

```bash
node -v     # should print v20.x.x or higher
npm -v      # should print a number
```

Then install both halves. **Two folders, two installs.**

```bash
cd server
npm install

cd ../client
npm install
```

---

## Running it

You need **two terminals**, both open, both running, all week.

**Terminal 1 — the backend**

```bash
cd server
npm run dev
```

You should see: `Server listening on http://localhost:5000`

**Terminal 2 — the frontend**

```bash
cd client
npm run dev
```

You should see: `Local: http://localhost:5173`

**Open `http://localhost:5173` in your browser.**

### What you should see on Day 0

> **Could not load albums: getAlbums() is not implemented yet — see Lab 2 (Day 2)**

**That is correct.** It is not broken. The two halves are not connected yet —
connecting them is what Day 2 is for. Take a screenshot of that message and
post it to the cohort channel. That is your pre-flight check.

---

## Checking the backend on its own

Your API works right now, independently of the browser. Prove it:

```bash
curl http://localhost:5000/api/albums
```

Or open `http://localhost:5000/api/albums` in a browser tab, or send the
request from Postman. All three work. **The frontend is the only thing that
cannot reach it yet.**

Remember this for the rest of the week: when something breaks, hit the
endpoint directly in Postman first. If Postman works and the browser does
not, the problem is the connection or the frontend. If Postman fails too,
the problem is the backend and you can ignore the frontend entirely.

---

## Where you will actually write code

Almost everything you do is in `server/`. In the client, you only ever touch
lines marked `// TODO (LAB)` — about a dozen across the whole week.

| File | What it is |
|---|---|
| `server/src/server.js` | Your API. You will rewrite parts of this every day. |
| `server/src/data.js` | Fake data. Replaced by a real file on Day 4. |
| `client/src/api.js` | **Every network call in the app.** Most of your client work is here. |
| `client/src/App.jsx` | The page. Holds the state. Has TODO markers. |
| `client/vite.config.js` | The dev proxy lives here, commented out until Day 2. |
| `client/src/components/` | Display only. You will not edit these. |
| `docs/` | Three templates you fill in during the week. |

---

## Common problems

| Message | What it means |
|---|---|
| `EADDRINUSE :::5000` | An old server is still running. Ctrl+C it, or close that terminal. |
| `Cannot find module 'express'` | You forgot `npm install`, or ran it in the wrong folder. |
| `Cannot use import statement outside a module` | `"type": "module"` is missing from `package.json`. |
| Site can't be reached | The server is not running. Check terminal 1. |
| Port 5173 already in use | Another Vite is running. Close it. |

---

## Deliberately not included

No database, and no login. Both come in the follow-on sprint. Until then,
your data lives in memory (Days 1–3) and then in a JSON file (Days 4–5).
