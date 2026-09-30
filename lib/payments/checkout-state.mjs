export const initialCheckoutState = Object.freeze({ status: 'idle', message: '' });

export function checkoutReducer(state, action) {
  switch (action.type) {
    case 'loading': return { status: 'loading', message: 'Preparing secure checkout…' };
    case 'opened': return { status: 'open', message: '' };
    case 'verifying': return { status: 'verifying', message: 'Verifying payment…' };
    case 'success': return { status: 'success', message: 'Payment verified. Your purchase is confirmed.' };
    case 'cancelled': return { status: 'cancelled', message: 'Checkout was closed. You have not been charged.' };
    case 'failed': return { status: 'error', message: action.message || 'Payment failed. Please try again.' };
    default: return state;
  }
}
