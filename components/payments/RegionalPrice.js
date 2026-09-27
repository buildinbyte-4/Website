'use client';

import { useEffect, useState } from 'react';
import { detectBrowserCountry, getPayflowOffer } from '@/lib/payflow/product';

export default function RegionalPrice() {
  const [offer, setOffer] = useState(getPayflowOffer('US'));

  useEffect(() => {
    setOffer(getPayflowOffer(detectBrowserCountry()));
  }, []);

  return (
    <div aria-live="polite">
      <p className="mt-2 font-display text-4xl font-semibold tracking-tight text-slate-950 dark:text-foreground">{offer.displayPrice}</p>
      <p className="mt-1 text-xs text-slate-500 dark:text-zinc-400">{offer.market} price · {offer.currency}</p>
    </div>
  );
}
