const Razorpay = require('razorpay');
const crypto = require('crypto');

// init
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/**
 * POST  /api/payments/create-order
 * body: { amount (rupees), currency?, receipt?, notes? }
 * Returns order for Razorpay Checkout.
 */
exports.createOrder = async (req, res) => {
  try {
    const {
      amount,
      currency = 'INR',
      receipt = `rcpt_${Date.now()}`,
      notes = {},
    } = req.body;

    if (!amount || amount < 1)
      return res.status(400).json({ success: false, message: 'Invalid amount' });

    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100), // paise
      currency,
      receipt,
      notes,
    });

    return res.status(200).json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.error('Razorpay error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * POST  /api/payments/verify-signature
 * body: { razorpay_order_id, razorpay_payment_id, razorpay_signature }
 */
exports.verifySignature = (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const expected = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex');

  if (expected === razorpay_signature)
    return res.status(200).json({ success: true, message: 'Payment verified' });

  return res.status(400).json({ success: false, message: 'Invalid signature' });
};