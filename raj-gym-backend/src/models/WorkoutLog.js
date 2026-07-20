const mongoose = require('mongoose');

const WorkoutLogSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    dateKey: { type: String, required: true }, // YYYY-MM-DD

    done: { type: Boolean, default: false },
    title: { type: String, default: '' },
    type: { type: String, default: '' },
    duration: { type: Number, default: 0, min: 0, max: 300 },
    notes: { type: String, default: '' }
  },
  { timestamps: true }
);

WorkoutLogSchema.index({ userId: 1, dateKey: 1 }, { unique: true });

module.exports = mongoose.model('WorkoutLog', WorkoutLogSchema);

