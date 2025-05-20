'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import PackingSlip from './PackingSlip';
import ShippingLabel from './ShippingLabel';
import Invoice from './Invoice';

export type OrderDetails = {
  _id: string;
  total: number;
  status: string;
  createdAt: string;
  items: {
    productId: {
      _id: string;
      name: string;
      images: string[];
    };
    quantity: number;
    size: string;
    color: string;
    price?: number;
  }[];
  user?: {
    email?: string;
  };
  shippingAddress?: {
    firstName: string;
    lastName: string;
    adresse: string;
    codePostal: string;
    ville: string;
    pays: string;
    telephone: string;
  };
};

export default function OrderDetailsPage() {
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [printMode, setPrintMode] = useState<'invoice' | 'delivery' | 'label' | null>(null);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(`http://localhost:4338/orders/${params.id}`, {
          credentials: 'include',
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Erreur');
        setOrder(data);
      } catch (err) {
        console.error('Erreur récupération commande :', err);
        router.push('/admin/orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [params.id]);

  useEffect(() => {
  if (!printMode) return;

  // Lance impression après mise à jour du DOM
  const timeout = setTimeout(() => {
    window.print();
  }, 100);

  const handleAfterPrint = () => {
    setPrintMode(null); // revenir à l'affichage normal après impression
  };

  window.addEventListener('afterprint', handleAfterPrint);

  return () => {
    clearTimeout(timeout);
    window.removeEventListener('afterprint', handleAfterPrint);
  };
}, [printMode]);

  if (loading) return <div className="p-6">Chargement...</div>;
  if (!order) return <div className="p-6">Commande introuvable.</div>;

  return (
    <div className="p-6 space-y-6 print:bg-white print:text-black">
      {/* Affichage écran uniquement */}
     
        <>
          <button
            onClick={() => router.back()}
            className="text-blue-600 hover:underline"
          >
            ← Retour
          </button>

          <h1 className="text-2xl font-bold">Commande {order._id}</h1>
          <p><strong>Statut :</strong> {order.status}</p>
          <p><strong>Montant :</strong> {order.total.toFixed(2)} €</p>
          <p><strong>Date :</strong> {new Date(order.createdAt).toLocaleDateString('fr-FR')}</p>
          <p><strong>Email client :</strong> {order.user?.email || 'N/A'}</p>

          <div>
            <h2 className="text-lg font-semibold mt-4">Adresse de livraison</h2>
            <p>{order.shippingAddress?.firstName} {order.shippingAddress?.lastName}</p>
            <p>{order.shippingAddress?.adresse}</p>
            <p>{order.shippingAddress?.codePostal} {order.shippingAddress?.ville}</p>
            <p>{order.shippingAddress?.pays}</p>
            <p>Téléphone : {order.shippingAddress?.telephone}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mt-4">Produits</h2>
            <div className="mt-4 space-y-4">
              {order.items.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 border border-gray-200 rounded-lg p-4 shadow-sm"
                >
                  <div className="flex-shrink-0">
                    {item.productId?.images?.[0] ? (
                      <img
                        src={item.productId.images[0]}
                        alt={item.productId.name}
                        className="w-20 h-20 object-cover rounded-md border"
                      />
                    ) : (
                      <div className="w-20 h-20 bg-gray-100 flex items-center justify-center rounded-md text-gray-400 text-sm">
                        Aucune image
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <p className="font-medium">{item.productId.name}</p>
                    <p className="text-sm text-gray-600">
                      Taille : <strong>{item.size}</strong>, Couleur : <strong>{item.color}</strong>
                    </p>
                    <p className="text-sm text-gray-600">
                      Quantité : <strong>{item.quantity}</strong>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Boutons d'impression */}
          <div className="flex flex-wrap gap-4 mt-8 print:hidden">
            <button
              onClick={() => setPrintMode('invoice')}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              🧾 Imprimer la facture
            </button>
            <button
              onClick={() => setPrintMode('delivery')}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              📦 Bon de commande
            </button>
            <button
              onClick={() => setPrintMode('label')}
              className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
            >
              🏷️ Étiquette colis
            </button>
          </div>
        </>
  

      {/* Contenu imprimable uniquement */}
      <div className={`hidden print:block absolute top-0 left-0 w-full z-50 bg-white`}>
        {printMode === 'invoice' && <Invoice order={order} />}
        {printMode === 'delivery' && <PackingSlip order={order} />}
        {printMode === 'label' && <ShippingLabel order={order} />}
      </div>

    </div>
  );
}
