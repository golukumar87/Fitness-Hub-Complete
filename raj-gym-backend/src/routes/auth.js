const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// firebase-admin is optional for local username/password auth.
// If dependency isn't installed, allow signup/login to still work.
let admin = null;
try {
  admin = require('firebase-admin');
} catch {
  admin = null;
}

const User = require('../models/User');

const authRouter = express.Router();

function signToken(user) {
  return jwt.sign(
    { sub: user._id.toString(), email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
}

function ensureFirebaseAdmin() {
  if (!admin) {
    throw new Error('firebase-admin not installed');
  }

  if (admin.apps?.length) return;


  // Local dev: GOOGLE_APPLICATION_CREDENTIALS should point to a service account JSON.
  // Production: you can set FIREBASE_ADMIN_SERVICE_ACCOUNT_JSON as a JSON string.
  const serviceJson = process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT_JSON;
  const credPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;

  if (serviceJson) {
    admin.initializeApp({ credential: admin.credential.cert(JSON.parse(serviceJson)) });
    return;
  }

  if (credPath) {
    admin.initializeApp({ credential: admin.credential.cert(require(credPath)) });
    return;
  }

  throw new Error('Firebase Admin credentials missing. Set GOOGLE_APPLICATION_CREDENTIALS or FIREBASE_ADMIN_SERVICE_ACCOUNT_JSON');
}

authRouter.post('/signup', async (req, res) => {
  try {
    const { name, email, phone, password } = req.body || {};

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'name, email, password are required' });
    }

    const existing = await User.findOne({ email: String(email).toLowerCase().trim() });
    if (existing) return res.status(409).json({ error: 'Email already registered' });

    const passwordHash = await bcrypt.hash(String(password), 10);

    const user = await User.create({
      name: String(name).trim(),
      email: String(email).toLowerCase().trim(),
      phone: phone ? String(phone).trim() : '',
      passwordHash
    });

    const token = signToken(user);

    return res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, phone: user.phone, joinedAt: user.joinedAt }
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Signup failed' });
  }
});

authRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) return res.status(400).json({ error: 'email and password are required' });

    const user = await User.findOne({ email: String(email).toLowerCase().trim() });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const ok = await bcrypt.compare(String(password), user.passwordHash);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

    const token = signToken(user);

    return res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, phone: user.phone, joinedAt: user.joinedAt }
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Login failed' });
  }
});

// Firebase Login (Option A)
// Frontend sends: { idToken }
// Backend verifies token, upserts Mongo user, then returns existing JWT
authRouter.post('/firebase-login', async (req, res) => {

  try {
    const { idToken } = req.body || {};
    if (!idToken) return res.status(400).json({ error: 'idToken is required' });

    try {
      ensureFirebaseAdmin();
    } catch (err) {
      return res.status(501).json({ error: 'firebase-admin not configured' });
    }


    const decoded = await admin.auth().verifyIdToken(String(idToken));
    const email = decoded.email ? String(decoded.email).toLowerCase().trim() : null;
    if (!email) return res.status(401).json({ error: 'Firebase token missing email' });

    const displayName = decoded.name ? String(decoded.name).trim() : '';
    const photoUrl = decoded.picture ? String(decoded.picture) : '';

    // Create user if not exists; also keep schema valid (passwordHash is required in your model)
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        name: displayName || 'Firebase User',
        email,
        phone: '',
        // required by schema: passwordHash
        passwordHash: await bcrypt.hash(String(decoded.uid), 10),
        profileImageUrl: photoUrl || ''
      });
    } else {
      // Optional: keep name/image up to date
      const updates = {};
      if (displayName && displayName !== user.name) updates.name = displayName;
      if (photoUrl && photoUrl !== user.profileImageUrl) updates.profileImageUrl = photoUrl;
      if (Object.keys(updates).length) await User.updateOne({ _id: user._id }, { $set: updates });
      user = await User.findById(user._id);
    }

    const token = signToken(user);

    return res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        joinedAt: user.joinedAt
      }
    });
  } catch (e) {
    console.error(e);
    return res.status(401).json({ error: 'Firebase login failed' });
  }
});

module.exports = { authRouter };

