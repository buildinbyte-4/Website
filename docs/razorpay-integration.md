# Direct Razorpay integration

BuildInByte uses Razorpay Standard Checkout directly. The browser requests an order from BuildInByte, opens Razorpay's hosted checkout, and sends the returned IDs and signature back to BuildInByte. Only the server can choose the SKU price or mark a payment paid.

The catalog contains one clearly labelled checkout test product priced at Razorpay's ₹1 minimum (100 paise). It has no downloadable asset, remains fulfilment-locked, and the server permits it only when `RAZORPAY_KEY_ID` starts with `rzp_test_`, preventing accidental Live Mode charges. Do not activate a commercial SKU in `lib/payments/pricing.mjs` until its private downloadable file and fulfilment mapping are ready. The preserved commercial regional offer is ₹2 INR for India (with UPI preferred) and $20 USD elsewhere. International payments and USD must be enabled on the Razorpay account before a USD order will succeed.

## Environment variables

Fill these values yourself in `.env.local`; never paste them into chat or commit that file:

```dotenv
NEXT_PUBLIC_APP_URL=https://your-deployment.example
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
SUPABASE_SECRET_KEY=sb_secret_...
RAZORPAY_KEY_ID=rzp_test_...
RAZORPAY_KEY_SECRET=...
RAZORPAY_WEBHOOK_SECRET=...
```

Add all variables to both **Preview** and **Production** in Vercel. Use the matching Supabase project for each environment. Razorpay Test Mode and Live Mode have separate key IDs, key secrets, webhook secrets, orders, and payments; never mix them. `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET`, and `SUPABASE_SECRET_KEY` are server-only. The create-order response returns only the safe Razorpay key ID.

Apply `supabase/migrations/20260930183249_razorpay_payments.sql` to the selected Supabase project before enabling a SKU. It creates RLS-protected order records and private webhook-deduplication records.

## Razorpay Dashboard

1. Enable the payment methods required for the account. UPI is preferred for India, while Razorpay may show other supported methods.
2. If the international $20 offer will be used, complete Razorpay's international-payments enablement and confirm USD support for the account.
3. Create a webhook pointing to `https://YOUR_DEPLOYMENT/api/payments/webhook`.
4. Subscribe to `payment.captured`, `payment.failed`, `payment.refunded`, `refund.processed`, and `order.paid`.
5. Put the webhook secret in the matching Vercel environment as `RAZORPAY_WEBHOOK_SECRET`.

The webhook handler verifies `X-Razorpay-Signature` against the untouched raw body. `X-Razorpay-Event-Id` prevents duplicate processing.

## Secure fulfilment boundary

No Storage bucket or product ZIP mapping currently exists, so this implementation never emits a download URL. A verified payment remains `fulfillment_status = locked`.

Before activating the first product:

1. Create a **private** Supabase Storage bucket such as `digital-products`.
2. Upload the ZIP under a stable, non-public object path.
3. Add the real SKU/name as an active entry in the server-only `PRODUCT_CATALOG` and map the SKU to that private object path.
4. Add an authenticated download route that confirms the caller owns a `paid` order for the SKU, then creates a short-lived signed Storage URL. Anonymous sales need a separate, hashed one-time fulfilment token delivered to the verified buyer email.
5. Test a captured payment, failed payment, dismissal, duplicate order request, webhook retry, refund, and expired download link in Test Mode before switching to Live Mode.

Never place the paid ZIP in `public/`, return its permanent Storage URL, or unlock it from the browser callback alone.
