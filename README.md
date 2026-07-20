
# 🏋️ Raj Fitness Gym - Complete Gym Management System

![Raj Gym Logo](images/logo.jpeg)

> **Transform Your Body, Transform Your Life** — A full-stack Progressive Web App (PWA) for gym management with membership, workout tracking, diet planning, trainer booking, QR-based smart entry, and more!

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🛠️ Languages & Technologies Used](#️-languages--technologies-used)
- [📁 Project Structure](#-project-structure)
- [🚀 How to Run](#-how-to-run)
- [🔐 Authentication System](#-authentication-system)
- [🌐 Backend API Documentation](#-backend-api-documentation)
- [📦 PWA & Offline Support](#-pwa--offline-support)
- [🗄️ Data Storage](#️-data-storage)
- [🎯 Key Modules Explained](#-key-modules-explained)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Features

### 🎨 Frontend (User-Facing)

| Feature | Description |
|---------|-------------|
| 🧭 **Responsive Navigation** | Sticky navbar with active link tracking, smooth scroll, and mobile hamburger menu |
| 🌗 **Dark/Light Theme** | Toggle between dark & light mode with `localStorage` persistence |
| 🔐 **Auth System** | Login/Signup with toggle, Firebase Auth (Google + Email/Password), JWT session management |
| 👤 **User Profile** | Avatar upload, name/email/phone editing, member-since date |
| 💪 **Workout Generator** | Generate workouts by level (Beginner/Intermediate/Advanced), focus (Full Body/Upper/Lower/Cardio), and duration |
| ⏱️ **Workout Timer** | Normal countdown timer + HIIT Interval Mode (Warmup/Work/Rest/Circuits) |
| 📊 **BMI Calculator** | Real-time BMI calculation with color-coded scale |
| 📈 **Progress Tracker** | Track Strength, Cardio, Flexibility, Nutrition with animated progress bars + save/reset |
| 📅 **Workout Log Calendar** | Week/Month view, mark workouts done, add notes, export JSON |
| 📊 **Dashboard** | 7-day workout completion bars + progress trends |
| 🥗 **Diet Planner** | Generate 7-day meal plans based on goal (Fat Loss/Muscle Gain), diet type (Veg/Non-Veg), and calorie level |
| 📆 **Weekly Routine Builder** | Create Mon-Sun routines with focus, track completion, save/reset |
| 🏆 **Badges & Streaks** | Gamified achievement system — unlock badges for consistency, first workout, trainer booking |
| 💬 **AI Chatbot** | Rule-based assistant for quick answers on plans, timings, trainers, contact |
| ⭐ **Reviews System** | Submit reviews (name, rating, text) displayed in testimonials slider |
| ❓ **FAQ Accordion** | Expandable FAQ section for common inquiries |
| 📧 **Newsletter Signup** | Email subscription form with validation |
| 📞 **Call Us Button** | Click-to-call functionality |
| 🎯 **Daily Motivational Quote** | Refreshing daily quotes with manual refresh |
| 🏅 **Live Member Counter** | Real-time active members display (backed by API) |
| 🔙 **Back to Top** | Floating scroll-to-top button |
| 📱 **PWA Ready** | Installable on mobile/desktop, service worker caching for offline access |

### 🧠 Backend (Admin/API)

| Feature | Description |
|---------|-------------|
| 🔑 **JWT Authentication** | Secure token-based auth with Firebase Admin SDK integration |
| 📝 **User CRUD** | Create/read/update users via REST API |
| 📊 **Progress API** | CRUD for workout progress data (MongoDB) |
| 📅 **Workout Logs API** | Persistent workout logs with date-key indexing |
| 📋 **Trainer Booking API** | Book/cancel trainers with slot capacity management (max 3 per slot) |
| 📈 **Active Members** | Daily active member count endpoint |
| 🔒 **Middleware Auth** | Protected routes with Bearer token verification |
| 🌐 **CORS Config** | Secure cross-origin resource sharing |

---

## 🛠️ Languages & Technologies Used

### 🌐 Frontend

| Technology | Icon | Purpose |
|------------|------|---------|
| **HTML5** | 🧱 | Page structure & semantic markup (`index.html`) |
| **CSS3** | 🎨 | Styling, animations, responsive design, dark/light themes (`style.css`) |
| **JavaScript (ES6+)** | ⚡ | All app logic — modals, timers, generators, auth, localStorage (`script.js`) |
| **JavaScript (Smart Entry)** | 📷 | QR code generation, BarcodeDetector API, camera integration (`smartEntry.js`) |
| **Firebase Auth** | 🔥 | Email/password & Google sign-in authentication |
| **QRCode.js** | 📲 | QR code generation library for member check-in |
| **Font Awesome 6** | 🎯 | Icons for UI elements (dumbbell, user, phone, etc.) |
| **Google Fonts** | 🔤 | Merriweather & Fira Sans typography |
| **Service Worker (PWA)** | 📦 | Offline caching for static assets (`sw.js`) |
| **Web App Manifest** | 📱 | PWA installable metadata (`manifest.json`) |

### 🖥️ Backend

| Technology | Icon | Purpose |
|------------|------|---------|
| **Node.js** | 🟢 | JavaScript runtime for server |
| **Express.js** | 🚂 | Web framework for REST API |
| **MongoDB Atlas** | 🍃 | Cloud NoSQL database for data persistence |
| **Mongoose** | 📦 | ODM for MongoDB schema management |
| **JSON Web Token (JWT)** | 🔐 | Secure user session management |
| **bcryptjs** | 🔒 | Password hashing for security |
| **Firebase Admin SDK** | 🔥 | Server-side Firebase token verification |
| **dotenv** | 🌿 | Environment variable management |
| **CORS** | 🌐 | Cross-origin resource sharing |
| **Nodemon** | 🔄 | Development auto-restart utility |

---

## 📁 Project Structure

```
GYM WEBSITE/
├── 📄 index.html                      # Main single-page application UI
├── 📄 style.css                       # Complete stylesheet (all sections, themes, responsive)
├── 📄 script.js                       # All frontend logic (1000+ lines)
├── 📄 smartEntry.js                   # QR code scanning & generation logic
├── 📄 sw.js                           # Service Worker for PWA offline caching
├── 📄 manifest.json                   # PWA manifest (icons, theme, start URL)
├── 📄 README.md                       # Project documentation (you are here)
├── 📄 .gitignore                      # Git ignore rules (root) — excludes node_modules, .env, OS/IDE/temp files
│
├── 🖼️ images/                         # Image assets
│   ├── gym.jpg                        # Hero background image
│   ├── logo.jpeg                      # Gym logo
│   ├── image.png                      # Additional image
│   └── default-avatar.png             # Default user avatar
│
├── 📄 LOCAL_DEV.md                    # Local development guide
├── 📄 run_commands.txt                # Common run commands
├── 📄 _tmp.css                        # Temporary CSS (dev)
│
├── 📄 TODO.md                         # Master todo list
├── 📄 TODO_PROGRESS.md                # Progress track todo
├── 📄 TODO_CORS_MANIFEST_FIX.md       # CORS/manifest fixes todo
├── 📄 TODO_QR_FIX.md                  # QR fix todo
├── 📄 package-lock.json               # NPM lock file
│
└── 📁 raj-gym-backend/                # 🖥️ Backend API Server
    ├── 📄 package.json                # Backend dependencies
    ├── 📄 package-lock.json           # Backend lock file
    ├── 📄 README.md                   # Backend-specific documentation
    ├── 📄 TODO.md                     # Backend todo list
    ├── 📄 .gitignore                  # Git ignore rules (backend) — excludes node_modules, .env, firebase configs, logs
    ├── 📄 firebaseAdminConfig.example.json  # Firebase admin config template
    ├── 📄 npm-install-out.txt         # Install log
    │
    └── 📁 src/
        ├── 📄 server.js               # Express server entry point
        │
        ├── 📁 middleware/
        │   └── 📄 auth.js             # JWT authentication middleware
        │
        ├── 📁 models/
        │   ├── 📄 User.js             # User schema (name, email, phone, passwordHash)
        │   ├── 📄 Progress.js         # Progress schema (strength, cardio, flex, nutrition)
        │   ├── 📄 WorkoutLog.js       # Workout log schema (dateKey, done, duration, notes)
        │   └── 📄 TrainerBooking.js   # Trainer booking schema (slot, goal, phone)
        │
        └── 📁 routes/
            ├── 📄 auth.js             # Auth routes (signup, login, firebase-login)
            ├── 📄 me.js               # User routes (profile, progress, logs, bookings)
            └── 📄 admin.js            # Admin routes (active members count)
```

### 🔒 What `.gitignore` Protects

| File(s) | Reason |
|---------|--------|
| `node_modules/` | Heavy, can be reinstalled via `npm install` |
| `.env` files | Contains sensitive secrets (MongoDB URI, JWT secret, Firebase keys) |
| Firebase service account JSONs | Private credentials — NEVER commit these |
| `.DS_Store`, `Thumbs.db` | OS-specific junk files |
| `.vscode/`, `.idea/` | IDE/editor personal settings |
| `*.log`, `npm-install-out.txt` | Log files that bloat the repo |
| `_tmp.*`, `tmp/`, `temp/` | Temporary/cache files |

---

## 🚀 How to Run

### 🖥️ Option 1: Open Frontend Only (Quick Preview)

```bash
# Simply open in browser
open index.html
# OR
start index.html    # Windows
```

### 🟢 Option 2: Full Stack (Frontend + Backend)

#### Prerequisites
- [Node.js](https://nodejs.org/) (v16+)
- [MongoDB Atlas](https://www.mongodb.com/atlas) account (free tier)
- [Firebase](https://console.firebase.google.com/) project (for Auth)

#### Step 1: Backend Setup

```bash
# Navigate to backend
cd raj-gym-backend

# Install dependencies
npm install

# Create .env file (copy from example)
# Required variables:
#   MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/gymdb
#   JWT_SECRET=your-super-secret-key-here
#   CORS_ORIGIN=http://127.0.0.1:5500
#   PORT=4000
#
# Optional (for Firebase Auth):
#   GOOGLE_APPLICATION_CREDENTIALS=path/to/firebase-service-account.json
#   OR
#   FIREBASE_ADMIN_SERVICE_ACCOUNT_JSON={"type":"service_account",...}
```

#### Step 2: Start Backend Server

```bash
# Development (with auto-reload via Nodemon)
npm run dev

# Production
npm start

# Server runs at: http://localhost:4000
```

#### Step 3: Start Frontend

```bash
# From project root, open index.html
# The frontend connects to the backend at http://127.0.0.1:4000
```

> 💡 **Tip**: For the best experience (PWA features work), use a local server like **Live Server** (VSCode extension) or `npx serve .`

---

## 🔐 Authentication System

### Flow Diagram

```
User → Firebase Auth (Email/Password or Google)
                ↓
         Firebase ID Token
                ↓
    Backend verifies token via Firebase Admin SDK
                ↓
         JWT issued to client
                ↓
    Client stores JWT in localStorage
                ↓
    All subsequent API calls include:
    Authorization: Bearer <JWT>
```

### Auth Modes Supported

| Mode | Description |
|------|-------------|
| 🔑 **Firebase Email/Password** | Sign up with email + password, verified on Firebase |
| 🌐 **Google Sign-In** | One-click Google account login |
| 📝 **Local JWT Signup** | Username/password signup (direct MongoDB + bcrypt) |
| 📝 **Local JWT Login** | Username/password login (direct MongoDB + bcrypt) |

### Auth Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/auth/signup` | Register with name, email, phone, password | ❌ |
| `POST` | `/api/auth/login` | Login with email, password | ❌ |
| `POST` | `/api/auth/firebase-login` | Firebase token verification & JWT exchange | ❌ |
| `GET` | `/api/me/me` | Get current user profile | ✅ Bearer Token |

---

## 🌐 Backend API Documentation

**Base URL:** `http://localhost:4000`

### 🔐 Auth Routes

#### `POST /api/auth/signup`
Register a new user.

```json
// Request Body
{
  "name": "Rahul Sharma",
  "email": "rahul@example.com",
  "phone": "9876543210",
  "password": "securePass123"
}

// Response (201)
{
  "token": "eyJhbGciOiJI...",
  "user": {
    "id": "64f...",
    "name": "Rahul Sharma",
    "email": "rahul@example.com",
    "phone": "9876543210",
    "joinedAt": "2024-01-15T10:30:00Z"
  }
}
```

#### `POST /api/auth/login`
Login with credentials.

```json
// Request Body
{
  "email": "rahul@example.com",
  "password": "securePass123"
}

// Response
{
  "token": "eyJhbGciOiJI...",
  "user": { ... }
}
```

#### `POST /api/auth/firebase-login`
Exchange Firebase ID token for backend JWT.

```json
// Request Body
{
  "idToken": "firebase-id-token-from-client"
}

// Response
{
  "token": "backend-jwt-token",
  "user": { ... }
}
```

### 👤 User Routes (Requires `Authorization: Bearer <token>`)

#### `GET /api/me/me`
Get current user profile.

```json
// Response
{
  "id": "64f...",
  "name": "Rahul Sharma",
  "email": "rahul@example.com",
  "phone": "9876543210",
  "joinedAt": "2024-01-15T10:30:00Z",
  "profileImageUrl": ""
}
```

#### `GET /api/me/progress`
Get user's fitness progress.

```json
// Response
{
  "strength": 75,
  "cardio": 60,
  "flexibility": 45,
  "nutrition": 80
}
```

#### `PUT /api/me/progress`
Update fitness progress.

```json
// Request Body
{
  "strength": 80,
  "cardio": 65,
  "flexibility": 50,
  "nutrition": 85
}

// Response
{
  "strength": 80,
  "cardio": 65,
  "flexibility": 50,
  "nutrition": 85
}
```

#### `GET /api/me/workout-logs?from=YYYY-MM-DD&to=YYYY-MM-DD`
Get workout logs within a date range.

```json
// Response
{
  "rows": [
    {
      "_id": "...",
      "userId": "...",
      "dateKey": "2024-01-15",
      "done": true,
      "title": "Full Body Workout",
      "type": "Strength",
      "duration": 45,
      "notes": "Felt great today!"
    }
  ]
}
```

#### `PUT /api/me/workout-logs`
Create or update a workout log for a specific date.

```json
// Request Body
{
  "dateKey": "2024-01-15",
  "done": true,
  "title": "Upper Body Push",
  "type": "Strength",
  "duration": 45,
  "notes": "Increased bench press by 5kg"
}

// Response
{ "ok": true }
```

#### `GET /api/me/trainer-bookings`
Get all trainer bookings for current user.

```json
// Response
{
  "rows": [
    {
      "_id": "...",
      "userId": "...",
      "name": "Rahul Sharma",
      "phone": "9876543210",
      "goal": "muscle-gain",
      "goalLabel": "Muscle Gain",
      "subSlotId": "morning_7_8",
      "subSlotLabel": "7:00 AM - 8:00 AM",
      "slotLabel": "Morning (6-9 AM) • 7:00 AM - 8:00 AM",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

#### `POST /api/me/trainer-bookings`
Book a trainer session.

```json
// Request Body
{
  "name": "Rahul Sharma",
  "phone": "9876543210",
  "goal": "muscle-gain",
  "goalLabel": "Muscle Gain",
  "subSlotId": "morning_7_8",
  "subSlotLabel": "7:00 AM - 8:00 AM",
  "slotLabel": "Morning (6-9 AM) • 7:00 AM - 8:00 AM"
}

// Response
{
  "booking": { ... }
}
```

#### `DELETE /api/me/trainer-bookings/:id`
Cancel a trainer booking.

```json
// Response
{ "ok": true }
```

### 📈 Admin Routes (Requires `Authorization: Bearer <token>`)

#### `GET /api/me/active-members-today`
Get count of active members today.

```json
// Response
{ "count": 47 }
```

### 🩺 Health Check

#### `GET /health`
Check if backend is running.

```json
{ "ok": true }
```

---

## 📦 PWA & Offline Support

### Service Worker (`sw.js`)

The service worker caches the following assets for offline access:

```
/ (root)
/index.html
/style.css
/script.js
/smartEntry.js
/images/logo.jpeg
/images/gym.jpg
```

**Cache Strategy:** Cache-first — assets are served from cache and updated in the background.

### Web App Manifest (`manifest.json`)

```json
{
  "name": "Raj Fitness Gym",
  "short_name": "Raj Gym",
  "description": "Best gym in your locality",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#1a1a1a",
  "theme_color": "#FF8C00",
  "icons": [
    { "src": "images/logo-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "images/logo-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

### 📱 How to Install PWA

1. Open the website in Chrome/Edge/Brave
2. Click the install icon (➕) in the address bar
3. Click "Install" — the app opens as a standalone window

---

## 🗄️ Data Storage

### 🖥️ Backend (MongoDB Atlas)

| Collection | Purpose | Key Fields |
|------------|---------|------------|
| `users` | User accounts | `name`, `email`, `passwordHash`, `phone`, `joinedAt` |
| `progresses` | Fitness progress | `userId`, `strength`, `cardio`, `flexibility`, `nutrition` |
| `workoutlogs` | Daily workout logs | `userId`, `dateKey`, `done`, `title`, `duration`, `notes` |
| `trainerbookings` | Trainer slot bookings | `userId`, `name`, `phone`, `goal`, `subSlotId`, `slotLabel` |

### 💾 Frontend (localStorage)

| Key Pattern | Purpose |
|-------------|---------|
| `token` | JWT authentication token |
| `loggedInUser` | Logged-in user object (name, email, phone, id) |
| `profileImage` | Base64-encoded profile image |
| `rememberMe` | Remembered email for login |
| `theme` | Dark/light theme preference |
| `rajGym_progress_{email}` | User's progress data |
| `rajGym_workouts_{email}` | Saved workout plans |
| `rajGym_workoutLogs_{email}` | Workout log calendar data |
| `rajGym_trainerBookings_{email}` | Trainer booking data (legacy) |
| `rajGym_diet_{email}` | Saved diet plans |
| `rajGym_routine_{email}` | Weekly routine data |
| `rajGym_badges_{email}` | Badges & achievements state |
| `rajGym_streak_{email}` | Consistency streak data |
| `rajGym_memberId_{email}` | QR member ID |
| `rajGym_checkins_global` | QR check-in history (global) |
| `rajGym_reviews_public` | User-submitted reviews |
| `users` | Local user list (legacy) |

---

## 🎯 Key Modules Explained

### 🏋️ Workout Generator
Select **Level** (Beginner/Intermediate/Advanced) + **Focus** (Full Body/Upper/Lower/Cardio) + **Duration** (15/30/45/60 min) → generates a structured workout plan with sets, reps, and rest times.

### ⏱️ Interval Timer
Toggle **Interval Mode** to configure:
- **Warmup** duration (sec)
- **Work** duration (sec)
- **Rest** duration (sec)
- **Rounds** count

The timer cycles through Warmup → Work → Rest → Work → ... → Complete.

### 🥗 Diet Planner
Generate 7-day meal plans based on:
- **Goal**: Fat Loss / Muscle Gain
- **Diet Type**: Vegetarian / Non-Veg
- **Calories**: Low / Normal / High

Each day includes Breakfast, Lunch, Dinner, and Snacks with macro hints.

### 🏆 Badges Engine
| Badge | How to Unlock |
|-------|-------------|
| 🥇 **First Workout Saved** | Save your first workout to "My Workouts" |
| 🥇 **Trainer Booking Done** | Successfully book a trainer session |
| 🥇 **Consistency Streak** | Save progress for 3+ consecutive days |

### 📷 Smart Entry (QR)
- **Members**: Generate a QR code containing their member ID → download & use for check-in
- **Frontdesk**: Scan member QR codes using device camera (BarcodeDetector API) or fallback manual entry
- **History**: Last 20 check-ins displayed with timestamps

---

## 🤝 Contributing

1. **Fork** the repository
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to branch: `git push origin feature/amazing-feature`
5. Open a **Pull Request**

### Development Guidelines

- ✅ Follow existing code style and conventions
- ✅ Use meaningful variable/function names
- ✅ Add comments for complex logic
- ✅ Test thoroughly before submitting
- ✅ Update README if adding new features
- ✅ Keep `.gitignore` up to date when adding new dependencies or config files

---

## 📄 License

This project is for **educational/demo purposes**.  
All rights reserved © 2026 Raj Fitness Gym.

---

## 🙏 Credits

- **Font Awesome** — Icons ([CDN](https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css))
- **Google Fonts** — Merriweather & Fira Sans typography
- **QRCode.js** — QR code generation library
- **Firebase** — Authentication service
- **MongoDB Atlas** — Cloud database
- **Unsplash / RandomUser** — Demo images

---

## 📸 Screenshots

> *(Add screenshots here for visual showcase)*

| Section | Preview |
|---------|---------|
| 🏠 Hero Section | ![Hero](images/gym.jpg) |
| 📝 Membership Plans | — |
| 💪 Workout Generator | — |
| 📊 Dashboard | — |

---

<div align="center">

**Made with ❤️ by Raj Fitness Gym Team**

⭐ **Star this repo** if you find it useful!

</div>

