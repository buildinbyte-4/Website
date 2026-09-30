export async function createIdempotentOrder({ input, offer, repository, gateway }) {
  const existing = await repository.findByIdempotencyKey(input.idempotencyKey);
  if (existing) {
    if (existing.product_sku !== input.sku || existing.customer_email !== input.email.toLowerCase()) {
      const error = new Error('IDEMPOTENCY_KEY_REUSED');
      error.status = 409;
      throw error;
    }
    if (!existing.razorpay_order_id) {
      const error = new Error('ORDER_CREATION_IN_PROGRESS');
      error.status = 409;
      throw error;
    }
    return { record: existing, created: false };
  }

  const record = await repository.reserve({
    idempotencyKey: input.idempotencyKey,
    sku: input.sku,
    email: input.email.toLowerCase(),
    name: input.name,
    userId: input.userId,
    countryCode: input.countryCode,
    amount: offer.amount,
    currency: offer.currency,
  });

  try {
    const providerOrder = await gateway.createOrder({
      amount: offer.amount,
      currency: offer.currency,
      receipt: `bib_${record.id.replaceAll('-', '').slice(0, 28)}`,
      notes: { payment_record_id: record.id, product_sku: input.sku },
    });
    return { record: await repository.attachProviderOrder(record.id, providerOrder.id), created: true };
  } catch (error) {
    await repository.markCreationFailed(record.id).catch(() => {});
    throw error;
  }
}
