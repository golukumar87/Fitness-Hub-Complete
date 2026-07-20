const express = require('express');
const { requireAuth } = require('../middleware/auth');

const Progress = require('../models/Progress');
const WorkoutLog = require('../models/WorkoutLog');
const TrainerBooking = require('../models/TrainerBooking');

const meRouter = express.Router();
meRouter.use(requireAuth);

const User = require('../models/User');

meRouter.get('/me', async (req, res) => {
  const user = await User.findById(req.user.id).lean();
  if (!user) return res.status(404).json({ error: 'User not found' });

  return res.json({
    id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    joinedAt: user.joinedAt,
    profileImageUrl: user.profileImageUrl || ''
  });
});


meRouter.get('/progress', async (req, res) => {
  const row = await Progress.findOne({ userId: req.user.id });
  if (!row) {
    return res.json({
      strength: 75,
      cardio: 60,
      flexibility: 45,
      nutrition: 80
    });
  }
  return res.json(row);
});

meRouter.put('/progress', async (req, res) => {
  const { strength, cardio, flexibility, nutrition } = req.body || {};

  const update = {
    strength: Number(strength),
    cardio: Number(cardio),
    flexibility: Number(flexibility),
    nutrition: Number(nutrition)
  };

  for (const k of ['strength','cardio','flexibility','nutrition']) {
    if (!Number.isFinite(update[k])) update[k] = k === 'strength' ? 75 : k === 'cardio' ? 60 : k === 'flexibility' ? 45 : 80;
    update[k] = Math.max(0, Math.min(100, Math.round(update[k])));
  }

  const row = await Progress.findOneAndUpdate(
    { userId: req.user.id },
    { $set: update },
    { new: true, upsert: true }
  );

  return res.json(row);
});

meRouter.get('/workout-logs', async (req, res) => {
  const { from, to } = req.query || {};
  // from/to optional: YYYY-MM-DD

  const q = { userId: req.user.id };
  if (from && to) {
    q.dateKey = { $gte: String(from), $lte: String(to) };
  }

  const rows = await WorkoutLog.find(q).sort({ dateKey: 1 });
  return res.json({ rows });
});

meRouter.put('/workout-logs', async (req, res) => {
  const { dateKey, done, title, type, duration, notes } = req.body || {};

  if (!dateKey) return res.status(400).json({ error: 'dateKey is required' });

  const doc = {
    userId: req.user.id,
    dateKey: String(dateKey),
    done: !!done,
    title: title ? String(title) : '',
    type: type ? String(type) : '',
    duration: duration != null ? Number(duration) : 0,
    notes: notes ? String(notes) : ''
  };

  await WorkoutLog.findOneAndUpdate(
    { userId: req.user.id, dateKey: doc.dateKey },
    { $set: doc },
    { upsert: true, new: true }
  );

  return res.json({ ok: true });
});

meRouter.get('/trainer-bookings', async (req, res) => {
  const rows = await TrainerBooking.find({ userId: req.user.id }).sort({ createdAt: -1 }).limit(20);
  return res.json({ rows });
});

meRouter.post('/trainer-bookings', async (req, res) => {
  const { name, phone, goal, goalLabel, subSlotId, subSlotLabel, slotLabel } = req.body || {};

  if (!name || !phone || !goal || !subSlotId) return res.status(400).json({ error: 'missing fields' });

  // Capacity rule: 3 bookings per subSlotId
  const CAPACITY = 3;
  const count = await TrainerBooking.countDocuments({ userId: req.user.id, subSlotId });
  // Note: In this simple implementation we count by this user only.
  // If you want gym-wide capacity, remove userId filter.
  // We'll implement gym-wide capacity below:
  const gymCount = await TrainerBooking.countDocuments({ subSlotId });

  if (gymCount >= CAPACITY) {
    return res.status(409).json({ error: 'This sub-slot is full' });
  }

  const booking = await TrainerBooking.create({
    userId: req.user.id,
    name: String(name).trim(),
    phone: String(phone).trim(),
    goal,
    goalLabel: goalLabel || goal,
    subSlotId: String(subSlotId),
    subSlotLabel: subSlotLabel || '',
    slotLabel: slotLabel || ''
  });

  return res.json({ booking });
});

meRouter.delete('/trainer-bookings/:id', async (req, res) => {
  const { id } = req.params;
  await TrainerBooking.deleteOne({ _id: id, userId: req.user.id });
  return res.json({ ok: true });
});

module.exports = { meRouter };

