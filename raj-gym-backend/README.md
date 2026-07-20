# Raj Gym Backend (Node.js + Express + MongoDB Atlas)

## 1) Setup

### Install dependencies
From repo root:

```bash
cd raj-gym-backend
npm i
```

### Configure environment
Edit `.env`:
- `MONGODB_URI` = your MongoDB Atlas connection string
- `JWT_SECRET` = any long random secret
- `CORS_ORIGIN` = frontend origin (example: http://127.0.0.1:5500)

## 2) Run

```bash
npm start
```

Backend will run at:
- `http://localhost:4000`

## API Routes

### Base URL
- `http://localhost:4000`

### Auth
- `POST /api/auth/signup`
  - body: `{ name, email, phone, password }`
- `POST /api/auth/login`
  - body: `{ email, password }`

Response: `{ token, user }`

### Me (requires `Authorization: Bearer <token>`)
- `GET /api/me` (debug)
- `GET /api/me/progress`
- `PUT /api/me/progress`
  - body: `{ strength, cardio, flexibility, nutrition }`
- `GET /api/me/workout-logs?from=YYYY-MM-DD&to=YYYY-MM-DD`
- `PUT /api/me/workout-logs`
  - body: `{ dateKey, done, title, type, duration, notes }`
- `GET /api/me/trainer-bookings`
- `POST /api/me/trainer-bookings`
  - body: `{ name, phone, goal, goalLabel, subSlotId, subSlotLabel, slotLabel }`
- `DELETE /api/me/trainer-bookings/:id`

### Token storage (frontend)
- Frontend ko login ke baad response me jo `token` mile, woh `localStorage` me save karna chahiye (e.g. key: `token`).
- Har request me header: `Authorization: Bearer <token>` pass karna hai.


