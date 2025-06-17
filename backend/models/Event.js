
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  organizer: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: String,
    required: true
  },
  location: String,
  type: String,
  imageUrl: String,
  isVirtual: {
    type: Boolean,
    default: false
  },
  description: String,
  registrationDeadline: String,
  registrationUrl: String,
  skills: [String],
  eligibility: String,
  prizes: String,
  source: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  isFeatured: { type: Boolean, default: false }
});

// Create index for searching
eventSchema.index({ 
  title: 'text',
  description: 'text',
  skills: 'text' 
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
