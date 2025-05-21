'use client';

import { OrderDetails } from './page';

export default function DeliverySlip({ order }: { order: OrderDetails }) {
  // 💡 Calcul du total HT à partir du total TTC
  const totalHT = order.total / 1.2;

  return (
    <div className="bg-white text-black p-8 print:block print:pt-10 print:pb-10 text-sm font-sans min-h-screen">
      {/* Logo ou nom entreprise */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-wide uppercase">MonEntreprise</h1>
        <p className="text-gray-600 text-base">Bon de commande</p>
      </div>

      {/* Infos commande */}
      <div className="mb-6">
        <p><strong>Numéro de commande :</strong> {order._id}</p>
        <p><strong>Date :</strong> {new Date(order.createdAt).toLocaleDateString('fr-FR')}</p>
      </div>

      {/* Infos client */}
      <div className="mb-6">
        <p><strong>Client :</strong> {order.shippingAddress?.firstName} {order.shippingAddress?.lastName}</p>
        <p>{order.shippingAddress?.adresse}</p>
        <p>{order.shippingAddress?.codePostal} {order.shippingAddress?.ville}</p>
        <p>{order.shippingAddress?.pays}</p>
        <p><strong>Email :</strong> {order.user?.email || 'N/A'}</p>
      </div>

      {/* Produits */}
      <table className="w-full border border-collapse mb-6">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2 text-left">Produit</th>
            <th className="border p-2 text-left">Taille</th>
            <th className="border p-2 text-left">Couleur</th>
            <th className="border p-2 text-left">Qté</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item, i) => (
            <tr key={i}>
              <td className="border p-2">{item.productId.name}</td>
              <td className="border p-2">{item.size}</td>
              <td className="border p-2">{item.color}</td>
              <td className="border p-2">{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Total HT */}
      <div className="text-right">
        <p><strong>Total HT :</strong> {totalHT.toFixed(2)} €</p>
        <p><small className="text-gray-600">TVA 20% incluse — Total TTC : {order.total.toFixed(2)} €</small></p>
      </div>
    </div>
  );
}
