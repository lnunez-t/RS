'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreatePromoPage() {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [discountType, setDiscountType] = useState<'percentage' | 'amount'>('percentage');
  const [expiresAt, setExpiryDate] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await fetch('http://localhost:4338/useradmin/verify-token', {
          method: 'GET',
          credentials: 'include',
        });
        if (!res.ok) throw new Error('Token invalide');
        setLoading(false);
      } catch (error) {
        router.push('/admin/login');
      }
    };
    verifyToken();
  }, [router]);

  const handleSubmit = async () => {
    try {
      const res = await fetch('http://localhost:4338/promos/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ code, value: discount, discountType, expiresAt }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Erreur lors de la création');
      alert('Code promo créé.');
      router.push('/admin/promo-codes');
    } catch (err) {
      console.error('Erreur création code promo :', err);
      alert('Erreur réseau');
    }
  };

  const generateCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setCode(result);
  };

  if (loading) return <div className="p-6">Chargement...</div>;

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Créer un code promo</h1>

      <div className="space-y-4">
        <div>
          <label className="block mb-1">Code</label>
          <div className="flex gap-2">
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full px-4 py-2 border rounded"
            />
            <button
              onClick={generateCode}
              className="bg-gray-200 px-3 rounded hover:bg-gray-300"
              title="Générer un code aléatoire"
            >
              🎲 Générer
            </button>
          </div>
        </div>

        <div>
          <label className="block mb-1">Réduction</label>
          <input
            type="number"
            value={discount}
            onChange={(e) => setDiscount(Number(e.target.value))}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Type de réduction</label>
          <div className="flex gap-4">
            <button
              onClick={() => setDiscountType('percentage')}
              className={`px-4 py-2 rounded border ${discountType === 'percentage' ? 'bg-blue-600 text-white' : 'bg-white text-black'}`}
            >
              Pourcentage
            </button>
            <button
              onClick={() => setDiscountType('amount')}
              className={`px-4 py-2 rounded border ${discountType === 'amount' ? 'bg-blue-600 text-white' : 'bg-white text-black'}`}
            >
              Montant fixe
            </button>
          </div>
        </div>

        <div>
          <label className="block mb-1">Date d'expiration</label>
          <input
            type="date"
            value={expiresAt}
            onChange={(e) => setExpiryDate(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          💾 Enregistrer
        </button>
      </div>
    </div>
  );
}
