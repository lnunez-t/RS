'use client';

import { OrderDetails } from './page';

export default function PackingSlip({ order }: { order: OrderDetails }) {
  return (
    <div className="bg-white text-black p-8 text-sm font-sans min-h-screen">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold">MonEntreprise</h1>
        <p className="text-gray-600">Bon de commande</p>
      </div>

      <p><strong>Commande n° :</strong> {order._id}</p>
      <p><strong>Date :</strong> {new Date(order.createdAt).toLocaleDateString('fr-FR')}</p>

      <table className="w-full mt-6 border border-collapse text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2 text-left">Produit</th>
            <th className="border p-2">Taille</th>
            <th className="border p-2">Couleur</th>
            <th className="border p-2">Qté</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item, i) => (
            <tr key={i}>
              <td className="border p-2">
                {typeof item.productId === 'object' && item.productId !== null
                  ? item.productId.name
                  : 'Nom indisponible'}
              </td>
              <td className="border p-2">{item.size}</td>
              <td className="border p-2">{item.color}</td>
              <td className="border p-2">{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
