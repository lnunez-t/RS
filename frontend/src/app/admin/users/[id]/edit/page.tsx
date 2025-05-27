'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditUserPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const params = useParams();

  const fetchUser = async () => {
    try {
      const res = await fetch(`http://localhost:4338/useradmin/users/${params.id}`, {
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Erreur serveur');
      setUser(data);
    } catch (err) {
      console.error('Erreur récupération utilisateur :', err);
      router.push('/admin/users');
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

        await fetchUser();
      } catch (error) {
        router.push('/admin/login');
      }
    };

    verifyAndFetch();
  }, [params.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev: any) => ({
      ...prev,
      infosPerso: {
        ...prev.infosPerso,
        [name]: value,
      },
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`http://localhost:4338/useradmin/users/${user._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ infosPerso: user.infosPerso }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Erreur lors de la sauvegarde');
      alert('Informations mises à jour.');
      router.push(`/admin/users/${user._id}`);
    } catch (err) {
      console.error('Erreur mise à jour :', err);
      alert('Erreur lors de la sauvegarde');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-6">Chargement...</div>;
  if (!user) return <div className="p-6">Utilisateur introuvable.</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <button
        onClick={() => router.push(`/admin/users/${user._id}`)}
        className="text-blue-600 hover:underline"
      >
        ← Retour
      </button>

      <h1 className="text-2xl font-bold">Modifier client</h1>

      <div className="border rounded-lg p-4 space-y-4">
        {['firstName', 'lastName', 'telephone', 'adresse', 'ville', 'codePostal', 'pays'].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 capitalize">{field}</label>
            <input
              name={field}
              value={user.infosPerso?.[field] || ''}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
            />
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium text-gray-700">Points fidélité</label>
          <input
            name="point_fedeliter"
            type="number"
            value={user.infosPerso?.point_fedeliter || 0}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
          />
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          💾 Sauvegarder
        </button>
      </div>
    </div>
  );
}
