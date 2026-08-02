export const financialData = {
  kpis: {
    grossRevenue: 124500,
    moneyLoss: 2100,
    netRevenue: 122400,
    moneyPaid: 95000,
    moneyPending: 27400,
  },
  trendData: [
    { date: 'Jul 25', revenue: 12000, loss: 100 },
    { date: 'Jul 26', revenue: 15000, loss: 300 },
    { date: 'Jul 27', revenue: 14500, loss: 200 },
    { date: 'Jul 28', revenue: 18000, loss: 500 },
    { date: 'Jul 29', revenue: 21000, loss: 100 },
    { date: 'Jul 30', revenue: 19000, loss: 400 },
    { date: 'Jul 31', revenue: 25000, loss: 500 },
  ],
  paymentMethods: [
    { name: 'Credit Card', value: 65 },
    { name: 'UPI', value: 15 },
    { name: 'PayPal', value: 10 },
    { name: 'Bank Transfer', value: 10 },
  ]
};

export const ordersData = [
  {
    id: 'ORD-8910',
    timestamp: '2026-08-01T10:30:00Z',
    customerName: 'Sarah Jenkins',
    contact: 'sarah@example.com',
    amount: 1450,
    paymentStatus: 'Paid',
    orderStatus: 'Delivered',
    address: '4231 Tech Blvd, San Francisco, CA',
    items: [
      { name: 'Enterprise Template License', price: 950 },
      { name: 'Priority Support (1yr)', price: 500 }
    ],
    transactionId: 'TXN-00192384'
  },
  {
    id: 'ORD-8911',
    timestamp: '2026-08-01T11:45:00Z',
    customerName: 'Marcus Cole',
    contact: 'marcus.c@startup.io',
    amount: 3200,
    paymentStatus: 'Pending',
    orderStatus: 'Processing',
    address: '88 Innovation Way, Austin, TX',
    items: [
      { name: 'Custom Backend Integration', price: 3200 }
    ],
    transactionId: 'TXN-00192385'
  },
  {
    id: 'ORD-8912',
    timestamp: '2026-08-01T14:15:00Z',
    customerName: 'Elena Rostova',
    contact: 'elena.r@design.com',
    amount: 150,
    paymentStatus: 'Failed',
    orderStatus: 'Canceled',
    address: '12 Designer Lane, New York, NY',
    items: [
      { name: 'UI Kit (Basic)', price: 150 }
    ],
    transactionId: 'TXN-00192386'
  }
];

export const supportTickets = [
  {
    id: 'TKT-104',
    status: 'Open Disputes',
    severity: 'High',
    customer: 'Marcus Cole',
    orderId: 'ORD-8911',
    subject: 'Payment processing error on Custom Backend Integration',
    history: [
      { sender: 'Marcus Cole', role: 'customer', timestamp: '11:50 AM', message: 'Hi, my card was charged but the order says Pending. Can you help?' },
      { sender: 'System', role: 'system', timestamp: '11:51 AM', message: 'Ticket automatically flagged as High Priority (Payment Issue).' }
    ]
  },
  {
    id: 'TKT-105',
    status: 'Pending Queries',
    severity: 'Low',
    customer: 'Sarah Jenkins',
    orderId: 'ORD-8910',
    subject: 'Where can I find the priority support portal?',
    history: [
      { sender: 'Sarah Jenkins', role: 'customer', timestamp: '09:00 AM', message: 'I purchased the priority support, but I am not sure where to access the private portal. Thanks!' }
    ]
  },
  {
    id: 'TKT-106',
    status: 'Resolved Issues',
    severity: 'Medium',
    customer: 'Elena Rostova',
    orderId: 'ORD-8912',
    subject: 'Refund requested for UI Kit',
    history: [
      { sender: 'Elena Rostova', role: 'customer', timestamp: 'Yesterday', message: 'I meant to buy the Pro kit, can I get a refund on the Basic kit?' },
      { sender: 'Admin', role: 'admin', timestamp: 'Yesterday', message: 'Hi Elena, I have processed the refund for the Basic kit. You should see it in 3-5 days. You can now purchase the Pro kit.' }
    ]
  }
];
