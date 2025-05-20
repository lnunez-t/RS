'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Order = {
  _id: string;
  total: number;
  createdAt: string;
  status: string;
  user?: { email?: string };
};

export default function OrderAdminPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const limit = 10;

  const router = useRouter();

  useEffect(() => {
    const verifyAndFetch = async () => {
      try {
        const res = await fetch('http://localhost:4338/useradmin/verify-token', {
          method: 'GET',
          credentials: 'include',
        });

        if (!res.ok) throw new Error('Token invalide');

        await fetchOrders();
      } catch (error) {
        router.push('/admin/login');
      }
    };

    verifyAndFetch();
  }, [page]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:4338/orders/admin/all?page=${page}&limit=${limit}`, {
        credentials: 'include',
      });

      const data = await res.json();
      if (!res.ok) {
        console.error('Erreur récupération commandes', data);
        return;
      }

      setOrders(data.results || []);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error('Erreur fetchOrders:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = orders.filter((order) =>
    order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.user?.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Commandes clients</h1>

      <input
        type="text"
        placeholder="Rechercher par ID ou email"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
      />

      {loading ? (
        <p>Chargement...</p>
      ) : (
        <>
          <div className="overflow-x-auto border rounded">
            <table className="min-w-full table-auto border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border">ID</th>
                  <th className="px-4 py-2 border">Montant</th>
                  <th className="px-4 py-2 border">Date</th>
                  <th className="px-4 py-2 border">Statut</th>
                  <th className="px-4 py-2 border">Utilisateur</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr
                    key={order._id}
                    className="text-sm cursor-pointer hover:bg-gray-100 transition"
                    onClick={() => router.push(`/admin/orders/${order._id}`)}
                  >
                    <td className="px-4 py-2 border">{order._id}</td>
                    <td className="px-4 py-2 border">{order.total.toFixed(2)} €</td>
                    <td className="px-4 py-2 border">{new Date(order.createdAt).toLocaleDateString('fr-FR')}</td>
                    <td className="px-4 py-2 border capitalize">{order.status}</td>
                    <td className="px-4 py-2 border">{order.user?.email || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={() => setPage(p => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
            >
              Page précédente
            </button>
            <span className="self-center">Page {page} / {totalPages}</span>
            <button
              onClick={() => setPage(p => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
            >
              Page suivante
            </button>
          </div>
        </>
      )}
    </div>
  );
}
