'use client';

import { OrderDetails } from './page';

export default function Invoice({ order }: { order: OrderDetails }) {
  return (
    <div className="print:p-8 p-4 bg-white text-black">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Facture</h1>
        <p>Date : {new Date(order.createdAt).toLocaleDateString('fr-FR')}</p>
        <p>Commande n° : {order._id}</p>
      </div>

      <div className="mb-6">
        <h2 className="font-semibold">Informations client</h2>
        <p>{order.shippingAddress?.firstName} {order.shippingAddress?.lastName}</p>
        <p>{order.shippingAddress?.adresse}</p>
        <p>{order.shippingAddress?.codePostal} {order.shippingAddress?.ville}</p>
        <p>{order.shippingAddress?.pays}</p>
        <p>Email : {order.user?.email || 'N/A'}</p>
        <p>Tél : {order.shippingAddress?.telephone}</p>
      </div>

      <table className="w-full mb-6 text-sm border border-collapse">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">Produit</th>
            <th className="border p-2">Taille</th>
            <th className="border p-2">Couleur</th>
            <th className="border p-2">Quantité</th>
            <th className="border p-2">Prix</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item, i) => (
            <tr key={i}>
              <td className="border p-2">{item.productId.name}</td>
              <td className="border p-2">{item.size}</td>
              <td className="border p-2">{item.color}</td>
              <td className="border p-2">{item.quantity}</td>
              <td className="border p-2">{item.price?.toFixed(2) ?? '—'} €</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-right font-bold text-lg">
        Total TTC : {order.total.toFixed(2)} €
      </div>
    </div>
  );
}
