const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true, required: true, lowercase: true },
  password: { type: String }, // hashed; empty for oauth users
  googleId: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
