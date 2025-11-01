import api from './api';

export const paymentAPI = {
  createOrder: async (amount, notes = {}) => {
    const res = await api.post('/payments/create-order', { amount, notes });
    return res.data; // { success, orderId, amount, currency, keyId }
  },
  verifySignature: async (payload) => {
    const res = await api.post('/payments/verify-signature', payload);
    return res.data; // { success }
  },
};

export default paymentAPI;
