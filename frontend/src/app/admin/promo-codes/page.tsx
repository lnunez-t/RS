'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PromoCodesAdminPage() {
  const router = useRouter();
  const [promoCodes, setPromoCodes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCodes = async () => {
    try {
      const res = await fetch('http://localhost:4338/promos', {
        credentials: 'include',
      });
      const data = await res.json();
      setPromoCodes(data);
    } catch (err) {
      console.error('Erreur récupération codes promo :', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const verifyAndFetch = async () => {
      try {
        const res = await fetch('http://localhost:4338/useradmin/verify-token', {
          method: 'GET',
          credentials: 'include',
        });
        if (!res.ok) throw new Error('Token invalide');
        await fetchCodes();
      } catch (error) {
        router.push('/admin/login');
      }
    };
    verifyAndFetch();
  }, [router]);

  if (loading) return <div className="p-6">Chargement des codes promo...</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Codes Promo</h1>
        <button
          onClick={() => router.push('/admin/promo-codes/create')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          ➕ Ajouter un code
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {promoCodes.map((promo) => (
          <div
            key={promo._id}
            className="border border-gray-200 rounded-lg p-4 shadow"
          >
            <p className="font-semibold text-lg">{promo.code}</p>
            <p className="text-sm">Réduction : {promo.discount}%</p>
            <p className="text-sm text-gray-500">Valide jusqu’au : {new Date(promo.expiryDate).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
