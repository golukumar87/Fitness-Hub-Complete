const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    strength: { type: Number, default: 75, min: 0, max: 100 },
    cardio: { type: Number, default: 60, min: 0, max: 100 },
    flexibility: { type: Number, default: 45, min: 0, max: 100 },
    nutrition: { type: Number, default: 80, min: 0, max: 100 }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Progress', ProgressSchema);

