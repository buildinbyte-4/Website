import PaymentResult from '@/components/payments/PaymentResult';

export const metadata = {
  title: 'Payment status | BuildInByte',
  robots: { index: false, follow: false },
};

export default function CheckoutResultPage() {
  return <PaymentResult />;
}
