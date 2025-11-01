const express = require('express');
const router = express.Router();
const {
  createOrder,
  verifySignature,
} = require('../controllers/paymentController');

// Create Razorpay order
router.post('/create-order', createOrder);

// Verify payment signature after successful payment
router.post('/verify-signature', verifySignature);

module.exports = router;
