# 🚀 Deploying the Raj Gym Backend (Render / Railway)

The frontend is a **static site** deployed on **Vercel** (see `vercel.json`).
The backend (`raj-gym-backend/`) is a **long-running Node/Express server** that needs
MongoDB + Socket.IO support, so it **cannot** run on Vercel's static hosting.

> ⚠️ **Important:** The backend was previously serving the frontend too
> (`GET /` → `index.html`). On Render/Railway this is no longer needed —
> the frontend is served by Vercel. The backend now only serves the API.

---

## Step 1 — Push the backend to a Git repo (if not already in GitHub)

Your backend lives in `raj-gym-backend/`. It is already part of the same repo
(`Fitness-Hub-Complete`), so **no extra repo is needed** — Render can pull from the same
repo but use the **root directory** setting (see below).

---

## Step 2 — Create a free Render Web Service

1. Go to <https://dashboard.render.com> → **New** → **Web Service**
2. Connect your GitHub repo (`golukumar87/Fitness-Hub-Complete`)
3. Configure:
   - **Name:** `raj-gym-backend`
   - **Root Directory:** `raj-gym-backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free
4. Add the environment variables (from your local `.env`):

| Variable    | Value |
|-------------|-------|
| `MONGODB_URI` | Your MongoDB Atlas connection string |
| `JWT_SECRET`  | Your long random secret |
| `CORS_ORIGIN` | Your Vercel domain, e.g. `https://your-project.vercel.app` |
| `PORT`        | `4000` (Render injects its own port automatically — optional) |

> For Firebase Auth, also add:
> `FIREBASE_ADMIN_SERVICE_ACCOUNT_JSON` (the JSON string) **or**
> `GOOGLE_APPLICATION_CREDENTIALS` (only works on platforms that provide the file).

5. Click **Create Web Service**. Render gives you a URL like:
   `https://raj-gym-backend.onrender.com`

---

## Step 3 — Point the frontend to your hosted backend

Open `index.html` and replace the default localhost with your Render URL **in the
`API_BASE_URL` script** (it sits in the `<head>`/before `script.js`):

```html
<script>
  window.API_BASE_URL = 'https://raj-gym-backend.onrender.com';
</script>
```

> The backend CORS allowlist already includes `https://*.vercel.app` and
> `http://127.0.0.1:5500`/`localhost:5500`, so both the deployed site and local dev work.

---

## Step 4 — Deploy & verify

1. **Vercel:** push the frontend changes → the site auto-deploys as a static site.
2. **Render:** push the backend changes → Render auto-deploys the API.
3. Verify the API health check:
   ```
   https://raj-gym-backend.onrender.com/health
   ```
   → should return `{ "ok": true }`
4. On your deployed site, log in / book a trainer → confirm it talks to the API.

---

## Optional — Railway instead of Render

Same concept on <https://railway.app>:
- New Project → Deploy from GitHub repo → **Root Directory** = `raj-gym-backend`
- Add the same env vars
- Get a URL like `https://raj-gym-backend.up.railway.app`
- Set `API_BASE_URL` to that URL

---

## Notes

- **CORS:** `raj-gym-backend/src/server.js` already allows:
  `http://127.0.0.1:5500`, `http://localhost:5500`, any `*.vercel.app`, and anything in `CORS_ORIGIN`.
- **No code changes to routes/models/middleware were made.** Only the CORS allowlist in `server.js` was extended for the Vercel domain.
- **Secrets:** `.env` and Firebase service-account JSON files are git-ignored and must be set as env vars in the hosting dashboard.

