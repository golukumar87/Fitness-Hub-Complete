const express = require('express');
const { requireAuth } = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();
router.use(requireAuth);

// Active members today (mode=2): users who logged in/did something today
// Since we don’t have a dedicated login/activity collection yet, we treat “active” as:
// users whose last login/workout date is within today.
// For now, we approximate by using the User collection count of users created today.
// If you add real activity tracking later, update this route.

router.get('/active-members-today', async (req, res) => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const end = new Date();
  end.setHours(23, 59, 59, 999);

  // Approximation: users created today
  const count = await User.countDocuments({
    joinedAt: { $gte: start, $lte: end }
  });

  return res.json({ count });
});

module.exports = { adminRouter: router };

