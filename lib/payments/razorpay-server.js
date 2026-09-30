import 'server-only';

import Razorpay from 'razorpay';

export function getRazorpayClient() {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) throw new Error('RAZORPAY_SERVER_CONFIGURATION_MISSING');
  return new Razorpay({ key_id: keyId, key_secret: keySecret });
}

export function getRazorpayPublicKey() {
  if (!process.env.RAZORPAY_KEY_ID) throw new Error('RAZORPAY_SERVER_CONFIGURATION_MISSING');
  return process.env.RAZORPAY_KEY_ID;
}
