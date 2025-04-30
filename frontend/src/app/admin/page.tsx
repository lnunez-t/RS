'use client';

import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();

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
