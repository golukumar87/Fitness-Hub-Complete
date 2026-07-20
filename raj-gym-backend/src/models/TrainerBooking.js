const mongoose = require('mongoose');

const TrainerBookingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true },

    goal: { type: String, required: true },
    goalLabel: { type: String, required: true },

    subSlotId: { type: String, required: true },
    subSlotLabel: { type: String, default: '' },
    slotLabel: { type: String, default: '' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('TrainerBooking', TrainerBookingSchema);

