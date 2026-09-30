export const MIN_RAZORPAY_AMOUNT = 100;

export const REGION_OFFERS = Object.freeze({
  IN: Object.freeze({ market: 'India', amount: 200, currency: 'INR', displayPrice: '₹2' }),
  GLOBAL: Object.freeze({ market: 'International', amount: 2000, currency: 'USD', displayPrice: '$20' }),
});

const SUPPORTED_CURRENCIES = new Set(['INR', 'USD']);
const INDIA_TIME_ZONES = new Set(['Asia/Calcutta', 'Asia/Kolkata']);

// Products are activated only after a private ZIP and fulfilment mapping exist.
// Keeping this empty prevents an unfinished product from accepting real money.
export const TEST_PRODUCT_SKU = 'buildinbyte-checkout-test-v1';

export const PRODUCT_CATALOG = Object.freeze({
  [TEST_PRODUCT_SKU]: Object.freeze({
    active: true,
    testOnly: true,
    name: 'BuildInByte Checkout Test',
    description: 'A ₹1 test purchase for verifying the BuildInByte payment flow. No digital download is included.',
    offer: Object.freeze({ market: 'Test purchase', amount: 100, currency: 'INR', displayPrice: '₹1' }),
  }),
});

export function validateRazorpayOffer(offer) {
  if (!Number.isInteger(offer.amount) || offer.amount < MIN_RAZORPAY_AMOUNT) throw new Error('AMOUNT_BELOW_RAZORPAY_MINIMUM');
  if (!SUPPORTED_CURRENCIES.has(offer.currency)) throw new Error('UNSUPPORTED_RAZORPAY_CURRENCY');
  return offer;
}

export function normalizeCountryCode(value) {
  const countryCode = String(value || '').trim().toUpperCase();
  return /^[A-Z]{2}$/.test(countryCode) ? countryCode : '';
}

export function countryFromTimeZone(timeZone) {
  return INDIA_TIME_ZONES.has(String(timeZone || '')) ? 'IN' : '';
}

export function detectBrowserCountry() {
  try {
    const timeZoneCountry = countryFromTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
    if (timeZoneCountry) return timeZoneCountry;
    return normalizeCountryCode(new Intl.Locale(navigator.language).region) || 'US';
  } catch {
    return 'US';
  }
}

export function detectRequestCountry(request, browserHint = '', localRuntimeCountry = '') {
  const hostingCountry = normalizeCountryCode(
    request.headers.get('x-vercel-ip-country') || request.headers.get('cf-ipcountry'),
  );
  if (hostingCountry) return hostingCountry;
  const localCountry = normalizeCountryCode(localRuntimeCountry);
  if (localCountry) return localCountry;
  const hintedCountry = normalizeCountryCode(browserHint);
  if (hintedCountry) return hintedCountry;
  const language = request.headers.get('accept-language')?.split(',')[0] || '';
  return normalizeCountryCode(language.match(/[-_]([A-Z]{2})\b/i)?.[1]) || 'US';
}

export function resolveProductOffer(sku, countryCode, catalog = PRODUCT_CATALOG) {
  const product = catalog[String(sku || '')];
  if (!product?.active) throw new Error('PRODUCT_NOT_AVAILABLE');

  const offer = product.offer || (normalizeCountryCode(countryCode) === 'IN' ? REGION_OFFERS.IN : REGION_OFFERS.GLOBAL);
  validateRazorpayOffer(offer);

  return Object.freeze({ ...product, ...offer, sku });
}
