'use client';

import { OrderDetails } from './page';

export default function ShippingLabel({ order }: { order: OrderDetails }) {
  const a = order.shippingAddress;

  return (
    <div className="bg-white text-black p-12 text-lg font-mono min-h-screen flex items-center justify-center">
      <div className="border border-black p-6 w-96">
        <p>{a?.firstName} {a?.lastName}</p>
        <p>{a?.adresse}</p>
        <p>{a?.codePostal} {a?.ville}</p>
        <p>{a?.pays}</p>
      </div>
    </div>
  );
}
