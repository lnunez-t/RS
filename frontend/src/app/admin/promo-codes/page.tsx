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
      console.log('✅ Codes promo reçus :', data);
      setPromoCodes(data);
    } catch (err) {
      console.error('Erreur récupération codes promo :', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer ce code promo ?')) return;
    try {
      const res = await fetch(`http://localhost:4338/promos/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Erreur serveur');
      }
      setPromoCodes(promoCodes.filter((code) => code._id !== id));
      alert('Code promo supprimé.');
    } catch (err) {
      console.error('Erreur suppression code promo :', err);
      alert('Erreur lors de la suppression');
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
        <button
          onClick={() => router.push('/admin')}
          className="text-blue-600 hover:underline"
        >
          ← Retour admin
        </button>
        <h1 className="text-2xl font-bold text-center flex-1">Codes Promo</h1>
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
            className="relative border border-gray-200 rounded-lg p-4 shadow"
          >
            <button
              onClick={() => handleDelete(promo._id)}
              className="absolute top-2 right-2 text-gray-400 hover:text-red-600"
              title="Supprimer le code"
            >
              ✕
            </button>
            <p className="font-semibold text-lg">{promo.code}</p>
            <p className="text-sm">
              Réduction :{' '}
              {promo.discountType === 'amount'
                ? `${promo.value} €`
                : `${promo.value} %`}
            </p>
            <p className="text-sm text-gray-500">
              Valide jusqu’au : {new Date(promo.expiresAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
