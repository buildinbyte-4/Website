export const PAYFLOW_PRODUCT = Object.freeze({
  sku: 'payflow-source-v1',
  name: 'Payflow Self-Hosted Payment Starter Kit',
  description: 'A self-hosted Razorpay-ready checkout, payment API, webhook worker, PostgreSQL storage, tests, and developer documentation.',
});

const OFFERS = Object.freeze({
  IN: Object.freeze({
    market: 'India',
    amountMinor: 200,
    currency: 'INR',
    displayPrice: '₹2',
    paymentMethods: Object.freeze({ upi: true, card: true, netBanking: true, wallet: true }),
  }),
  GLOBAL: Object.freeze({
    market: 'International',
    amountMinor: 2000,
    currency: 'USD',
    displayPrice: '$20',
    paymentMethods: Object.freeze({ upi: false, card: true, netBanking: false, wallet: true }),
  }),
});

const INDIA_TIME_ZONES = new Set(['Asia/Calcutta', 'Asia/Kolkata']);

export function normalizeCountryCode(value) {
  const countryCode = String(value || '').trim().toUpperCase();
  return /^[A-Z]{2}$/.test(countryCode) ? countryCode : '';
}

export function getPayflowOffer(countryCode) {
  return normalizeCountryCode(countryCode) === 'IN' ? OFFERS.IN : OFFERS.GLOBAL;
}

export function countryFromTimeZone(timeZone) {
  return INDIA_TIME_ZONES.has(String(timeZone || '')) ? 'IN' : '';
}

export function detectBrowserCountry() {
  try {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const timeZoneCountry = countryFromTimeZone(timeZone);
    if (timeZoneCountry) return timeZoneCountry;
    const localeRegion = new Intl.Locale(navigator.language).region;
    return normalizeCountryCode(localeRegion) || 'US';
  } catch {
    return 'US';
  }
}

export function detectRequestCountry(request, submittedCountry, localRuntimeCountry = '') {
  const hostingCountry = normalizeCountryCode(
    request.headers.get('x-vercel-ip-country') || request.headers.get('cf-ipcountry'),
  );
  if (hostingCountry) return hostingCountry;
  const localCountry = normalizeCountryCode(localRuntimeCountry);
  if (localCountry) return localCountry;
  const browserCountry = normalizeCountryCode(submittedCountry);
  if (browserCountry) return browserCountry;
  const language = request.headers.get('accept-language')?.split(',')[0] || '';
  return normalizeCountryCode(language.match(/[-_]([A-Z]{2})\b/i)?.[1]) || 'US';
}

export function isKnownPayflowOffer(amountMinor, currency) {
  return Object.values(OFFERS).some((offer) => offer.amountMinor === amountMinor && offer.currency === currency);
}
