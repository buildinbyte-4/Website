# Payflow website integration

This branch sells the Payflow source-code product for **$20 USD** through the separately hosted Payflow gateway. Payment credentials remain on the gateway and payment-provider pages; this Next.js app never collects card, CVV, UPI PIN, OTP, or bank credentials.

## 1. Start Payflow locally

Follow the Payflow repository's `docs/first-payment-test.md`. Create a TEST merchant whose allowed return hosts include `localhost` for local testing and the website hostname for staging/production. The merchant API key needs `payments:write` and `payments:read` scopes.

Run the Payflow API on `http://localhost:8787` and its checkout frontend on the URL configured by Payflow's `CHECKOUT_BASE_URL`.

## 2. Configure this website

Copy these entries from `.env.example` into `.env.local` and replace the two secrets:

```dotenv
PAYFLOW_API_URL=http://localhost:8787/api/v1
PAYFLOW_API_KEY=your_test_merchant_api_key
PAYFLOW_WEBHOOK_SECRET=the_same_merchant_webhook_secret_used_when_the_merchant_was_created
PAYFLOW_APP_URL=http://localhost:8000
```

`PAYFLOW_API_KEY` and `PAYFLOW_WEBHOOK_SECRET` are server-only. Never rename them with a `NEXT_PUBLIC_` prefix and never commit `.env.local`.

## 3. Run the website

```powershell
npm install
npm run dev
```

Open `http://localhost:8000/#digital-products`, enter a test name and email, accept the terms, and select **Buy source code — $20**. The browser is redirected to Payflow's hosted checkout.

## 4. Complete a test payment

Use the mock provider for an end-to-end application test without moving money, or configure Razorpay TEST credentials in Payflow. After the provider returns to `/checkout/result`, the website asks Payflow's authenticated merchant-status endpoint for the authoritative result.

## 5. Webhook setup

For real provider testing, `PAYFLOW_APP_URL` must be a public HTTPS origin. Payflow sends signed merchant events to:

```text
https://your-domain.example/api/payments/webhook
```

The handler verifies the timestamp and HMAC signature, validates the fixed product amount/currency/reference, and reconciles status with Payflow before accepting the event.

## 6. Before live sales

1. Change the Payflow merchant from TEST to PRODUCTION and use a production-scoped API key.
2. Use HTTPS for both applications.
3. Register the production website hostname in the Payflow merchant allowlist.
4. Configure Razorpay live credentials only on the Payflow server.
5. Perform one low-value live purchase and one refund.
6. Connect successful webhooks to durable order fulfilment or keep delivery manual. This branch confirms payments but deliberately does not expose a public ZIP download URL.
7. Keep the source ZIP in private storage and send access only after the payment status is `SUCCESS`.
