const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  bookingId: {
    type: String,
    required: true,
    unique: true
  },
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true
  },
  movieTitle: {
    type: String,
    required: true
  },
  theater: {
    name: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    }
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  seats: [{
    id: String,
    type: String,
    price: Number
  }],
  totalAmount: {
    type: Number,
    required: true
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['card', 'upi', 'wallet']
  },
  paymentStatus: {
    type: String,
    default: 'completed',
    enum: ['pending', 'completed', 'failed', 'refunded']
  },
  status: {
    type: String,
    default: 'upcoming',
    enum: ['upcoming', 'completed', 'cancelled']
  },
  userEmail: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  bookingDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Generate booking ID before saving
bookingSchema.pre('save', function(next) {
  if (!this.bookingId) {
    this.bookingId = 'BK' + Date.now().toString().slice(-6) + Math.random().toString(36).substr(2, 3).toUpperCase();
  }
  next();
});

module.exports = mongoose.model('Booking', bookingSchema);