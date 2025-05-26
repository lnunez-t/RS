'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await fetch('http://localhost:4338/useradmin/verify-token', {
          method: 'GET',
          credentials: 'include',
        });

        if (!res.ok) throw new Error('Invalid token');

        setLoading(false);
      } catch (error) {
        router.push('/admin/login');
      }
    };

    verifyToken();
  }, [router]);

  if (loading) {
    return <div className="text-center mt-10">Chargement...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6">
      <h1 className="text-3xl font-bold">Interface Admin</h1>

      <button
        onClick={() => router.push('/admin/products')}
        className="cursor-pointer px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Gestion produits
      </button>

      <button
        onClick={() => router.push('/admin/orders')}
        className="cursor-pointer px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
      >
        Gestion commandes
      </button>

      <button
        onClick={() => router.push('/admin/users')}
        className="cursor-pointer px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
      >
        Comptes clients
      </button>

      <button
        onClick={() => router.push('/admin/send-email')}
        className="cursor-pointer px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
      >
        Envoyer un mail
      </button>

      <button
        onClick={() => router.push('/admin/promo-codes')}
        className="cursor-pointer px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
      >
        Codes promo
      </button>
    </div>
  );
}
