const path = require('path');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { authRouter } = require('./routes/auth');
const { meRouter } = require('./routes/me');
const { adminRouter } = require('./routes/admin');


dotenv.config();

const app = express();

app.use(cors({

  origin: (origin, cb) => {
    const allowed = new Set([
      'http://127.0.0.1:5500',
      'http://127.0.0.1:5501',
      'http://localhost:5500',
      'http://localhost:5501',
    ]);

    if (!origin) return cb(null, true); // non-browser requests

    const fromEnv = process.env.CORS_ORIGIN;
    if (fromEnv && origin === fromEnv) return cb(null, true);

    // Allow any Vercel preview/production domain (https://<project>.vercel.app)
    if (origin.endsWith('.vercel.app')) return cb(null, true);

    return cb(null, allowed.has(origin));
  },
  credentials: true
}));


app.use(express.json({ limit: '2mb' }));

app.get('/health', (req, res) => res.json({ ok: true }));

app.use('/api/auth', authRouter);
app.use('/api/me', meRouter);
app.use('/api/me', adminRouter);


// Serve frontend (GYM WEBSITE) from this backend.
// So GET / loads index.html and static assets (style.css, script.js, images, etc.) work.
// __dirname = .../raj-gym-backend/src
// Frontend folder: .../RAJ Project/GYM WEBSITE
const frontendStaticDir = path.join(__dirname, '..', '..');

// SPA fallback: any unknown route returns index.html
// Use a regex-style catch-all to avoid path-to-regexp “Missing parameter name” errors.
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(frontendStaticDir, 'index.html'));
});


const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI;



if (!MONGODB_URI) {
  console.error('Missing MONGODB_URI in .env');
  process.exit(1);
}

async function start() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected');

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (e) {
    console.error('Failed to start server:', e);
    process.exit(1);
  }
}

start();

