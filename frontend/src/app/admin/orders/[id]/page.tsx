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
    } | string | null;
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

const allowedStatuses = ['en attente', 'payée', 'expédiée', 'livrée', 'annulée'];

export default function OrderDetailsPage() {
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [printMode, setPrintMode] = useState<'invoice' | 'delivery' | 'label' | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const router = useRouter();
  const params = useParams();

  // ✅ Vérifie que l'admin est connecté
  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        const res = await fetch('http://localhost:4338/useradmin/verify-token', {
          method: 'GET',
          credentials: 'include',
        });
        if (!res.ok) throw new Error('Token invalide');
      } catch (error) {
        console.error('Admin non authentifié');
        router.push('/admin/login');
      }
    };
    verifyAdmin();
  }, [router]);

  // 🔄 Récupère la commande
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

  // 🖨️ Impression
  useEffect(() => {
    if (!printMode) return;
    const timeout = setTimeout(() => window.print(), 100);
    const handleAfterPrint = () => setPrintMode(null);
    window.addEventListener('afterprint', handleAfterPrint);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('afterprint', handleAfterPrint);
    };
  }, [printMode]);

  // 🔄 Changement de statut
  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    if (!order) return;
    setUpdatingStatus(true);
    try {
      const res = await fetch(`http://localhost:4338/orders/${order._id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setOrder((prev) => prev ? { ...prev, status: newStatus } : prev);
      }
    } catch (err) {
      console.error('Erreur mise à jour statut:', err);
    } finally {
      setUpdatingStatus(false);
    }
  };

  // 🗑️ Suppression
  const handleDelete = async () => {
    if (!order) return;
    if (!confirm('Confirmer la suppression de cette commande ?')) return;
    try {
      const res = await fetch(`http://localhost:4338/orders/${order._id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (res.ok) {
        alert('Commande supprimée avec succès.');
        router.push('/admin/orders');
      } else {
        const data = await res.json();
        alert(data.message || 'Erreur lors de la suppression');
      }
    } catch (err) {
      console.error('Erreur suppression commande:', err);
      alert('Erreur réseau');
    }
  };

  if (loading) return <div className="p-6">Chargement...</div>;
  if (!order) return <div className="p-6">Commande introuvable.</div>;

  return (
    <div className="p-6 space-y-6 print:bg-white print:text-black">
      <button
        onClick={() => router.back()}
        className="text-blue-600 hover:underline"
      >
        ← Retour
      </button>

      <h1 className="text-2xl font-bold">Commande {order._id}</h1>

      <div className="flex items-center gap-4">
        <p><strong>Statut :</strong> {order.status}</p>
        <select
          value={order.status}
          onChange={handleStatusChange}
          disabled={updatingStatus}
          className="border rounded px-2 py-1 text-sm"
        >
          {allowedStatuses.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

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
            <div key={i} className="flex items-center gap-4 border border-gray-200 rounded-lg p-4 shadow-sm">
              <div className="flex-shrink-0">
                {typeof item.productId === 'object' && item.productId?.images?.[0] ? (
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
                <p className="font-medium">
                  {typeof item.productId === 'object' && item.productId !== null
                    ? item.productId.name
                    : 'Nom indisponible'}
                </p>
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

      <div className="flex flex-wrap gap-4 mt-8 print:hidden">
        <button onClick={() => setPrintMode('invoice')} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          🧾 Imprimer la facture
        </button>
        <button onClick={() => setPrintMode('delivery')} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          📦 Bon de commande
        </button>
        <button onClick={() => setPrintMode('label')} className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800">
          🏷️ Étiquette colis
        </button>
        <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
          🗑️ Supprimer la commande
        </button>
      </div>

      <div className="hidden print:block absolute top-0 left-0 w-full z-50 bg-white">
        {printMode === 'invoice' && <Invoice order={order} />}
        {printMode === 'delivery' && <PackingSlip order={order} />}
        {printMode === 'label' && <ShippingLabel order={order} />}
      </div>
    </div>
  );
}
