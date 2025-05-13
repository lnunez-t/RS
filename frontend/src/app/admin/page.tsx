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
          credentials: 'include', // Indispensable si tu utilises les cookies HTTP-only
        });

        if (!res.ok) {
          throw new Error('Invalid token');
        }

        // Token valide → continuer
        console.log("test");
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
    </div>
  );
}
